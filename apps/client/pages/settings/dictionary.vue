<script lang='ts' setup>
import type { TabsItem } from '@nuxt/ui';
import type { RouterOutput } from '~/trpc';

const { $trpc } = useNuxtApp();

const keyWord = ref('');
const keyWordDebounced = refDebounced(keyWord, 500);
const category = await $trpc.dictionary.categoriesOfDictionary.query();
const categoryItems: TabsItem[] = category.map(item => ({ value: item.code, label: item.name, icon: item.icon ?? '' }));
const activeCategory = ref<string>(categoryItems[0].value as string);
const { data: dictionary } = await $trpc.dictionary.dictionaries.useQuery(computed(() => ({ categoryCode: activeCategory.value, keyWord: keyWordDebounced.value })));
const toast = useToast();

function handleAddDictionary(item: RouterOutput['dictionary']['dictionaries'][0]) {
  $trpc.dictionary.addDictionary.mutate(item!.id).catch((err) => {
    toast.add({ title: 'Error', description: err.message });
  });
}
</script>

<template>
  <div>
    <UInput v-model="keyWord" icon="i-lucide-search" size="md" placeholder="Search dictionary" class="w-full" />

    <div class="mt-4">
      <UTabs v-model="activeCategory" default-value="" :items="categoryItems" class="w-full" />
      <div v-for="item in dictionary" :key="item?.id" class="flex items-center space-x-2 h-[100px]">
        <UIcon v-if="item?.coverIcon" :name="item?.coverIcon" size="100" />
        <div class="text-sm flex flex-col h-full py-[15px] flex-1">
          <div class="flex-1">
            <div class="font-bold text-sm">
              {{ item?.name }}
            </div>
            <div class="text-xs text-gray-500">
              {{ item?.description }}
            </div>
          </div>
          <div class="text-xs text-gray-500">
            Total: {{ item?.words.length }}
          </div>
        </div>
        <div>
          <UButton color="primary" variant="outline" icon="i-mdi-plus" @click="handleAddDictionary(item)">
            Add
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='css' scoped></style>
