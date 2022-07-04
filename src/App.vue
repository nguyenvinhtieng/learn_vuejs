<template>
  <Header></Header>
  <router-view />
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Vinh Tieng Web Page";
      },
    },
  },
  components: {
    Header,
  },
};
</script>

<style>
@import "./assets/css/global.scss";
</style>
