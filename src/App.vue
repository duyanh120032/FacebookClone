<template>
  <Suspense>
    <template #default>
      <v-app>
        <component :is="layout">
          <loading v-if="loading"></loading>
          <toast :type="notify.type" :message="notify.msg" v-if="notify.msg" />
          <router-view></router-view>
        </component>
      </v-app>
    </template>
    <template #fallback>
      <div>loading....</div>
    </template>
  </Suspense>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Loading from "./components/Loading.vue";
import Toast from "./components/Toast.vue";
import { generateToken } from "./services/authService";
import { getPosts } from "./services/PostServices";

const route = useRoute();
const router = useRouter();
const store = useStore();

const layout = computed(() => {
  if (route.meta.layout === "auth") {
    return "auth-layout";
  }
  return "default-layout";
});

onMounted(async () => {
  if (localStorage.getItem("token")) {
    await generateToken(localStorage.getItem("token"), router);
  }
  if (store.getters.getToken) {
    await getPosts(store.getters.getToken);
  }
});
const loading = computed(() => {
  return store.state.loading.loading;
});
const notify = computed(() => {
  return store.state.notify;
});
</script>
