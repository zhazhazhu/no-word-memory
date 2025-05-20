<script lang='ts' setup>
const { data } = useAuth();
const { data: users } = await useFetch('/api/users');
</script>

<template>
  Hello world{{ data }}{{ users }}
</template>

<style lang='css' scoped></style>
