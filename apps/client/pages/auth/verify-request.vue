<script lang='ts' setup>
definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <div class="p-8 h-full">
    <div class="flex items-center">
      <UIcon name="i-material-symbols-arrow-back-ios-new" />
      <ULink to="/signin" class="text-sm ml-1">
        Back
      </ULink>
    </div>
    <div class="flex flex-col items-center justify-center h-full">
      <UIcon name="i-mdi-email-check" class="text-6xl text-green-500" />
      <div class="text-2xl">
        Check your email
      </div>
      <div class="mt-4">
        A sign in link has been sent to your email address.
      </div>
    </div>
  </div>
</template>

<style lang='css' scoped></style>
