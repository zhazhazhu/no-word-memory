<script lang='ts' setup>
import type { NavigationMenuItem } from '@nuxt/ui';

definePageMeta({
  redirect: '/settings/dictionary',
});

const menuItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: '词书设置',
      icon: 'i-lucide-book-open',
      to: '/settings/dictionary',
    },
    {
      label: '学习设置',
      icon: 'i-lucide-settings-2',
      to: '/settings/schedule',
    },
    {
      label: '系统设置',
      icon: 'i-lucide-settings',
      to: '/settings/system',
    },
  ],
]);
</script>

<template>
  <div class="flex space-x-10 pt-[20px]">
    <div class="w-[240px]">
      <UNavigationMenu orientation="vertical" :items="menuItems" />
    </div>

    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang='css' scoped></style>
