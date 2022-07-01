<template>
  <Header></Header>
  <router-view />
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
@import "./assets/css/global.scss";
</style>
