import { createRouter, createWebHistory } from "vue-router";
import TodoApp from "./components/TodoApp.vue";
import Page404 from "./components/Page404.vue";
import PageMain from "./components/PageMain";
import PagePasswordValidate from "./components/PagePasswordValidate.vue";
import Weather from "./components/Weather.vue";
import Post from "./components/Post.vue";
import Login from "./components/PageLogin.vue";

export const routes = [
  {
    path: "/todoapp",
    name: "todoapp",
    component: TodoApp,
    meta: {
      title: "Todo App",
      authRequired: true,
    },
  },
  {
    path: "/",
    name: "page main",
    component: PageMain,
  },
  {
    path: "/password-validate",
    name: "pasword validate",
    component: PagePasswordValidate,
    meta: {
      title: "Password Validate",
      authRequired: true,
    },
  },
  {
    path: "/weather",
    name: "weather",
    component: Weather,
    meta: {
      title: "Waether API",
      authRequired: true,
    },
  },
  {
    path: "/post",
    name: "post",
    component: Post,
    meta: {
      title: "Post",
      authRequired: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login Page",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: Page404,
    meta: {
      title: "404 Not Found",
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "bad-not-found",
    component: Page404,
    meta: {
      title: "404 Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
const LOCAL_STORAGE_NAME = "09123823";
import { createToast } from "mosha-vue-toastify";
import { store } from "./store.js";
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    // check login
    if (!localStorage.getItem(LOCAL_STORAGE_NAME)) {
      createToast(
        {
          title: "Please Login!",
          description: "Please login to use this future!",
        },
        { type: "danger", timeout: 5000 }
      );
      next({
        path: "/login",
      });
    } else {
      // call api
      store.logined = true;
      store.userData = { name: "Tieng", age: "21" };
      next();
    }
  } else {
    next();
  }
});

export default router;
