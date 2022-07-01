<template>
  <header>
    <router-link to="/"> Home </router-link>
    <router-link to="/todoapp"> Todo App </router-link>
    <router-link to="/password-validate"> Validate </router-link>
    <router-link to="/weather"> Weather </router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
  beforeMount() {},
};
</script>
<style>
@import "../assets/css/header.scss";
</style>
