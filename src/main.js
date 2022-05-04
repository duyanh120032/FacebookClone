import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./Routes";
import { defineAsyncComponent } from "vue";
import store from "./store";

loadFonts();
const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);
app.component(
  "default-layout",
  defineAsyncComponent(() =>
    import(/* webpackChunkName: "async-component" */ "./layouts/DefaultLayout.vue")
  )
);
app.component(
  "auth-layout",
  defineAsyncComponent(() =>
    import(/* webpackChunkName: "async-component" */ "./layouts/AuthLayout.vue")
  )
);
app.mount("#app");
