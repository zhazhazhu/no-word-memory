import { db, schemas } from '@no-word-memory/database';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

const dictionaries = protectedProcedure
  .input(z.object({ categoryCode: z.string(), keyWord: z.string().optional() }).optional())
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.id;
    const keyword = input?.keyWord?.trim();
    // 如果传了 categoryId，就筛选出这个分类下的词典
    if (input?.categoryCode) {
      const relatedDictionaries = await db.query.dictionaryCategoryRelations.findMany({
        where: (rel, { eq }) => eq(rel.categoryCode, input.categoryCode),
        with: {
          dictionary: {
            with: {
              words: true,
              userDictionaries: {
                where: (ud, { eq }) => eq(ud.userId, userId),
              },
            },
          },
        },
      });

      // 如果传了 keyWord，对 dictionary.name/description 过滤
      const filtered = keyword
        ? relatedDictionaries
            .map(rel => rel.dictionary)
            .filter(dict =>
              dict?.name?.toLowerCase().includes(keyword.toLowerCase())
              || dict?.description?.toLowerCase().includes(keyword.toLowerCase()),
            )
        : relatedDictionaries.map(rel => rel.dictionary);

      return filtered.map(dict => ({
        ...dict,
        isJoined: dict && dict.userDictionaries.length > 0 || false,
      }));
    }

    // 没有传 categoryId，查全部
    const dictionaries = await db.query.dictionaries.findMany({
      where: keyword
        ? (dict, { ilike, or }) =>
            or(
              ilike(dict.name, `%${keyword}%`),
              ilike(dict.description, `%${keyword}%`),
            )
        : undefined,
      with: {
        words: true,
        categories: {
          with: { category: true },
        },
        userDictionaries: {
          where: (ud, { eq }) => eq(ud.userId, userId),
        },
      },
    });

    return dictionaries.map(dict => ({
      ...dict,
      isJoined: dict && dict.userDictionaries.length > 0 || false,
    }));
  });

export type Dictionary = Awaited<ReturnType<typeof dictionaries>>;

const categoriesOfDictionary = protectedProcedure.query(async () => {
  const dictionary = await db.query.categories.findMany({
    with: {
      dictionaries: {
        with: {
          dictionary: true,
        },
      },
    },
  });
  return dictionary;
});

const myDictionaries = protectedProcedure.query(async () => {
  const dictionary = await db.query.userDictionaries.findMany({
    with: {
      dictionary: {
        with: {
          words: true,
        },
      },
    },
  });
  return dictionary;
});

const addDictionary = protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
  const exist = await db.query.userDictionaries.findFirst({ where: (posts, { eq }) => (eq(posts.dictionaryId, input)) });
  if (exist)
    throw new Error('字典已存在');

  const dictionary = await db.insert(schemas.userDictionaries).values({
    userId: ctx.session.id.toString(),
    dictionaryId: input,
  }).returning();
  return dictionary;
});

const dictionary = router({
  dictionaries,
  myDictionaries,
  addDictionary,
  categoriesOfDictionary,
});

export { dictionary };
