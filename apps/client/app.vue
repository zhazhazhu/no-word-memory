<script lang='ts' setup>
const userDictionary = userDictionaryStore();

await userDictionary.fetch();
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style lang='css' scoped></style>
