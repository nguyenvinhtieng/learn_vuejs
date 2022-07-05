<template>
  <header>
    <div v-for="l in links" :key="l">
      <router-link :to="l.link">{{ l.name }} </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      links: [
        { link: "/", name: "Home" },
        { link: "/todoapp", name: "Todo App" },
        { link: "/password-validate", name: "Validate" },
        { link: "/weather", name: "Weather" },
        { link: "/post", name: "Post" },
        { link: "/news", name: "News" },
        { link: "/login", name: "Login" },
      ],
    };
  },
  beforeMount() {},
};
</script>
<style>
@import "../assets/css/header.scss";
</style>
