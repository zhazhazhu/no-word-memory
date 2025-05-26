<script lang='ts' setup>
const { $trpc } = useNuxtApp();

const dictionary = await $trpc.dictionary.dictionaries.query();
</script>

<template>
  <div>
    <UInput icon="i-lucide-search" size="md" placeholder="Search dictionary" class="w-full" />

    <div>
      <div v-for="item in dictionary" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang='css' scoped></style>
