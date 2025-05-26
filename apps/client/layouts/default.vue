<script lang='ts' setup>
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';

const { data: session, signOut } = useAuth();

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
      to: '/learn-classroom',
    },
    {
      label: 'My Content',
      icon: 'i-lucide-book-open',
      to: '/my-content',
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
const dropdownItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Sign out',
      icon: 'i-lucide-log-out',
      onClick: () => signOut(),
    },
  ],
]);
</script>

<template>
  <div class="relative">
    <!-- <img src="~/assets/images/pexels-yaroslav-shuraev-1834403.jpg" class="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-30"> -->
    <header class="bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50">
      <UContainer class="h-full">
        <div class="flex items-center justify-between h-full">
          <div class="mr-[20px] text-xl font-bold cursor-pointer flex items-end" @click="navigateTo('/')">
            <UIcon name="i-fluent-color-notebook-20" size="32" />
            <span>NoWords</span>
          </div>

          <UNavigationMenu orientation="horizontal" :items="menuItems" class="flex-1" />

          <div class="ml-[20px]">
            <UDropdownMenu
              :items="dropdownItems"
              :ui="{
                content: 'w-38',
              }"
            >
              <UTooltip :text="session?.user?.name || ''">
                <UButton :avatar="{ src: session?.user?.image || '' }" color="neutral" variant="ghost" size="xl" />
              </UTooltip>
            </UDropdownMenu>
          </div>
        </div>
      </UContainer>
    </header>

    <main class="min-h-[calc(100vh-var(--ui-header-height))]">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<style lang='css' scoped></style>
