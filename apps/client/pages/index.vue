<script lang='ts' setup>
const { data } = useAuth();
const { $trpc } = useNuxtApp();

const users = await $trpc.userList.query();
</script>

<template>
  Authenticated: {{ data }}
  Users: {{ users }}
</template>

<style lang='css' scoped></style>
