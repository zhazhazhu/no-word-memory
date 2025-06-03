<script lang='ts' setup>
const { $trpc } = useNuxtApp();
const { data: session } = useAuth();
const { wordCount } = userDictionaryStore();

safeCall(() => $trpc.learning_records.today.query());
</script>

<template>
  <div class="h-[calc(100vh-100px)] flex flex-col items-center justify-center space-y-14">
    <div class="flex flex-col items-center space-y-4">
      <!-- <UIcon name="i-solar-flag-2-bold-duotone" size="60" class="-rotate-30 text-primary" /> -->
      <div class="font-bold text-5xl text-primary">
        Welcome back
      </div>
      <div class="font-bold text-2xl">
        Hello, {{ session?.user?.name || '' }}, This is your schedule today
      </div>
    </div>
    <div class="flex items-center">
      <div class="w-[200px] text-center">
        <div class="font-bold text-[1.1rem] text-neutral-500">
          Learned
        </div>
        <div class="text-[1rem] space-x-2 text-neutral-500">
          <span class="font-bold text-5xl text-default">0</span>
          <span>/</span>
          <span>{{ wordCount }}</span>
        </div>
      </div>
      <div class="w-[200px] text-center">
        <div class="font-bold text-[1.1rem] text-neutral-500">
          Reviewed
        </div>
        <div class="text-[1rem] space-x-2 text-neutral-500">
          <span class="font-bold text-5xl text-default">0</span>
          <span>/</span>
          <span>0</span>
        </div>
      </div>
    </div>
    <div class="flex w-[400px] h-[60px] space-x-4">
      <UButton block class="text-2xl" leading-icon="i-mdi-play" :ui="{ leadingIcon: 'size-8' }" @click="navigateTo('/learning')">
        Learn
      </UButton>
      <UButton variant="soft" block class="text-2xl" icon="i-mdi-play" :ui="{ leadingIcon: 'size-8' }">
        Review
      </UButton>
    </div>
  </div>
</template>

<style lang='css' scoped></style>
