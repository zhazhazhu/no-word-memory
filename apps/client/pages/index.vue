<script lang='ts' setup>
const { data } = useAuth();
const { $trpc } = useNuxtApp();

const users = await $trpc.user.list.query();
const exist = await $trpc.user.existByEmail.query('1');
</script>

<template>
  <p>
    Authenticated: {{ data }}
  </p>
  <p>
    Users: {{ users }}
  </p>
  <p>
    is user exist? {{ exist }}
  </p>
</template>

<style lang='css' scoped></style>
