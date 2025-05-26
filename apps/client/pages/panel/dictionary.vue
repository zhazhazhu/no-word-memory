<script lang='ts' setup>
import type { TableColumn } from '@nuxt/ui';
import type { Row } from '@tanstack/vue-table';
import { h, resolveComponent } from 'vue';

const UButton = resolveComponent('UButton');
const UBadge = resolveComponent('UBadge');
const UDropdownMenu = resolveComponent('UDropdownMenu');

const toast = useToast();
const { $trpc } = useNuxtApp();
const dictionary = await $trpc.dictionary.dictionaries.query();
const columns: TableColumn<typeof dictionary[0]>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorFn: row => row.words.length,
    header: 'Words',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            'content': {
              align: 'end',
            },
            'items': getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'class': 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      );
    },
  },
];

function getRowItems(row: Row<typeof dictionary[0]>) {
  return [
    {
      type: 'label',
      label: 'Actions',
    },
    {
      label: 'Set in current dictionary',
    },
  ];
}
</script>

<template>
  <div class="h-full p-8 space-y-6">
    <div class="text-xl text-primary font-bold">
      Change dictionary
    </div>

    <div>
      <UTable :data="dictionary" :columns="columns" class="flex-1" />
    </div>
  </div>
</template>

<style lang='css' scoped></style>
