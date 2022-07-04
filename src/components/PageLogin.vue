<template>
  <div class="login">
    <h3>Login Page</h3>
    <form action="#!" class="form-login">
      <div class="input">
        <label for="username" class="input__label">Username</label>
        <input
          type="text"
          class="input__field"
          name="username"
          placeholder="Enter your username"
          v-model="username"
        />
      </div>
      <div class="input">
        <label for="password" class="input__label">Password</label>
        <input
          type="password"
          class="input__field"
          name="password"
          placeholder="Enter your password"
          v-model="password"
        />
      </div>
      <div class="action">
        <button class="btn-login" @click="login($event)">Login</button>
        <button class="btn-logout" @click="logout($event)">Logout</button>
      </div>
    </form>
  </div>
</template>

<script>
import { store } from "../store.js";
const LOCAL_STORAGE_NAME = "09123823";
export default {
  name: "PageLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: function (e) {
      e.preventDefault();
      if (!this.checkLogin()) return;
      if (this.username === "1" && this.password === "1") {
        this.$moshaToast(
          {
            title: "Login success",
            description: "Hi! Welcome to dashboard",
          },
          { type: "success", timeout: 5000 }
        );
        localStorage.setItem(LOCAL_STORAGE_NAME, "admin");
        store.logined = true;
        store.userData = { name: "Tieng", age: "21" };
        this.$router.push("/");
      } else {
        this.$moshaToast(
          {
            title: "Login Failed",
            description: "Username or password is incorrect",
          },
          { type: "danger", timeout: 5000 }
        );
      }
    },
    logout: function (e) {
      e.preventDefault();
      localStorage.removeItem(LOCAL_STORAGE_NAME);
      this.$moshaToast(
        {
          title: "User logout",
          description: "Good bye, See you later!",
        },
        { type: "info", timeout: 5000 }
      );
    },
    checkLogin: function () {
      console.log(localStorage);
      if (this.username === "") {
        this.$moshaToast(
          {
            title: "Username is empty",
            description: "Username can not be empty",
          },
          { type: "danger", timeout: 5000 }
        );
        return false;
      }
      if (this.password === "") {
        this.$moshaToast(
          {
            title: "Password is empty",
            description: "Password can not be empty",
          },
          { type: "danger", timeout: 5000 }
        );
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
@import "../assets/css/login.scss";
</style>
