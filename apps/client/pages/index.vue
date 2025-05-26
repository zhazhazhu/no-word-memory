<script lang='ts' setup>
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center space-y-4">
    <div class="w-[300px] h-[100px] bg-lime-500/50 rounded-2xl flex flex-col relative cursor-pointer select-none">
      <UIcon name="i-material-symbols-play-arrow-rounded" size="60" class="absolute top-3 left-2" />
      <div class="flex-1 flex flex-col items-start justify-center translate-x-18">
        <div class="text-2xl font-bold">
          Learn
        </div>
        <div class="text-[14px] font-bold">
          2000
        </div>
      </div>
    </div>

    <div class="w-[300px] h-[100px] bg-lime-500/50 rounded-2xl flex flex-col relative select-none">
      <UIcon name="i-material-symbols-play-arrow-rounded" size="60" class="absolute top-3 left-2" />
      <div class="flex-1 flex flex-col items-start justify-center translate-x-18">
        <div class="text-2xl font-bold">
          Review
        </div>
        <div class="text-[14px] font-bold">
          532
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='css' scoped></style>
