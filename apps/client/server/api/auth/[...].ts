import process from 'node:process';
import { NuxtAuthHandler } from '#auth';
import { trpc } from '@no-word-memory/api';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const exist = await trpc.user.exist.query(user.id);
      if (exist === false) {
        const id = await trpc.user.register.mutate({
          id: user.id,
          name: user.name!,
          email: user.email!,
          avatar: user.image!,
        });
        return Boolean(id);
      }
      return true;
    },
  },
});
