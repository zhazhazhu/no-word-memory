<script lang='ts' setup>

</script>

<template>
  <div class="flex items-center justify-center h-screen relative prose">
    <div class="absolute top-0 -z-10 h-full w-full bg-white">
      <div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" />
      <div class="absolute bottom-auto left-auto left-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[90%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" />
    </div>

    <div class="size-[600px] bg-white rounded-3xl shadow-xl">
      <slot />
    </div>
  </div>
</template>

<style lang='css' scoped></style>
