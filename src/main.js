import { createApp } from "vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import moshaToast from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.component("QuillEditor", QuillEditor);
app.component("Datepicker", Datepicker);
app.use(moshaToast);
app.use(router);
app.mount("#app");
