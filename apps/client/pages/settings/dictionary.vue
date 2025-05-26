<script lang='ts' setup>
import type { TabsItem } from '@nuxt/ui';

const { $trpc } = useNuxtApp();

const items = ref<TabsItem[]>([
  {
    label: 'All',
  },
  {
    label: 'Population',
  },
  {
    label: 'Primary School',
  },
  {
    label: 'Elementary School',
  },
  {
    label: 'High School',
  },
  {
    label: 'University',
  },
  {
    label: 'Aboard',
  },
  {
    label: 'Other',
  },
]);

const dictionary = await $trpc.dictionary.dictionaries.query();

function handleAddDictionary(item: typeof dictionary[0]) {
  $trpc.dictionary.addDictionary.mutate(item.id);
}
</script>

<template>
  <div>
    <UInput icon="i-lucide-search" size="md" placeholder="Search dictionary" class="w-full" />

    <div class="mt-4">
      <UTabs :items="items" class="w-full" />
      <div v-for="item in dictionary" :key="item.id" class="flex items-center space-x-2 h-[100px]">
        <UIcon v-if="item.coverIcon" :name="item.coverIcon" size="100" />
        <div class="text-sm flex flex-col h-full py-[15px] flex-1">
          <div class="flex-1">
            <div class="font-bold text-sm">
              {{ item.name }}
            </div>
            <div class="text-xs text-gray-500">
              {{ item.description }}
            </div>
          </div>
          <div class="text-xs text-gray-500">
            Total: {{ item.words.length }}
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
