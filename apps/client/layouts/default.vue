<script lang='ts' setup>
import type { NavigationMenuItem } from '@nuxt/ui';

const { data: session } = useAuth();

// const colorMode = useColorMode();

// const colorOptions: Record<string, { icon: string; value: string }> = {
//   light: {
//     icon: 'i-heroicons-sun-20-solid',
//     value: 'light',
//   },
//   dark: {
//     icon: 'i-heroicons-moon-20-solid',
//     value: 'dark',
//   },
// };
const menuItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Learn Classroom',
      icon: 'i-lucide-plane-takeoff',
      to: '/learn-classroom'
    },
    {
      label: 'My Content',
      icon: 'i-lucide-book-open',
      to: '/my-content'
    },
    {
      label: 'Panel',
      icon: 'i-lucide-chart-line',
      to: '/panel',
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/zhazhazhu',
      target: '_blank',
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      to: '/help',
    },
    {
      label: 'Theme',
      icon: 'i-heroicons-sun-20-solid',
    },
  ],
]);
</script>

<template>
  <div class="relative">
    <img src="~/assets/images/pexels-yaroslav-shuraev-1834403.jpg" class="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-30">
    <UContainer>
      <div class="flex items-center h-[65px]">
        <UTooltip :text="session?.user?.name || ''">
          <UAvatar :src="session?.user?.image || ''" :alt="session?.user?.name || ''" />
        </UTooltip>

        <UNavigationMenu orientation="horizontal" :items="menuItems" class="flex-1 ml-4" />
      </div>
    </UContainer>
    <UContainer class="h-[calc(100vh-65px)] py-[20px]">
      <slot />
    </UContainer>
  </div>
</template>

<style lang='css' scoped></style>
