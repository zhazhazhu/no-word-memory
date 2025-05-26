<script lang='ts' setup>

</script>

<template>
  <div class="h-full rounded-2xl  p-8 space-y-6">
    <div class="flex items-center justify-between">
      <div class="text-xl text-primary font-bold">
        Learning
      </div>
      <UButton color="primary" variant="outline" @click="$router.push('/panel/dictionary')">
        View dictionary
      </UButton>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="h-[200px] bg-white rounded-2xl">
        正在学习
      </div>
      <div class="h-[200px] bg-white rounded-2xl">
        配套词书
      </div>
    </div>

    <div class="text-xl text-primary font-bold">
      My progress
    </div>

    <div class="h-[200px] bg-white rounded-2xl">
      Progress
    </div>

    <div class="text-xl text-primary font-bold">
      Calendar
    </div>

    <div class="h-[200px] bg-white rounded-2xl">
      Calendar
    </div>
  </div>
</template>

<style lang='css' scoped></style>
