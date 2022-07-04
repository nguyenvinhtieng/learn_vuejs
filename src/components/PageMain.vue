<template>
  <div class="mid">
    <h3>Select Page</h3>
  </div>
</template>

<script>
import { store } from "../store.js";
export default {
  name: "PageMain",
  beforeMount() {
    console.log("Main: ", store);
  },
};
</script>
<style>
.mid {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
