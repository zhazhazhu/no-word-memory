<script setup lang="ts">
definePageMeta({
  auth: { unauthenticatedOnly: true },
});

const { signIn } = useAuth();
</script>

<template>
  <div>
    <p>Sign-In Options:</p>
    <UButton @click="signIn('github', { callbackUrl: '/' })">
      Github
    </UButton>
  </div>
</template>
