<script setup lang="ts">
// Remember to disable the middleware protection from your page!
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' },
});

const { signIn } = useAuth();

/*
 * NOTE: Here we hard-coded username and password
 * On your own page this should probably be connected to two inputs
 */
const demoCredentials = { username: 'test', password: 'hunter2' };
</script>

<template>
  <div>
    <p>Sign-In Options:</p>
    <UButton @click="signIn('github')">
      Github
    </UButton>
    <UButton @click="signIn('credentials', demoCredentials)">
      Username and Password
    </UButton>
  </div>
</template>
