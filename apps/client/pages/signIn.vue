<script setup lang="ts">
definePageMeta({
  auth: { unauthenticatedOnly: true },
});

const { signIn } = useAuth();

function handleSignin() {
  signIn('github',{callbackUrl:'/'});
}
</script>

<template>
  <div>
    <p>Sign-In Options:</p>
    <UButton @click="handleSignin">
      Github
    </UButton>
  </div>
</template>
