<template>
  <v-navigation-drawer app v-model="drawer" color="white">
    <v-list density="compact" nav color="primary" rounded class="mt-3 ml-2" v-if="user">
      <router-link :to="`/profile/${user._id}`">
        <v-list-item
          color="secondary"
          two-line
          :prepend-avatar="user?.avatar"
          :title="user.fullname"
          subtitle="Logged in"
        ></v-list-item>
      </router-link>
      <v-divider class="my-4"></v-divider>
      <v-list color="primary">
        <div class="d-flex text-center justify-space-between mx-4 font-weight-bold">
          <span>{{ user.followers?.length }} Followers</span>
          <span>{{ user.friends?.length }} Friends</span>
        </div>
      </v-list>
      <v-divider class="my-3"></v-divider>
      <h4 class="text-secondary mx-3">Feed</h4>
      <v-list-item
        :prepend-icon="feed.icon"
        :title="feed.title"
        :value="feed.value"
        v-for="feed in feeds"
        :key="feed.title"
        @click="doAction(feed.title)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, watchEffect,computed } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
defineProps({
  drawer: {
    type: Boolean,
    default: false,
  },
});
const doAction = (title) => {
  if (title === "Friends") {
    router.push('/find-friends');
  }
  if (title === "Saved") {
    router.push('/saved');
  }
};
// const user = ref(null);

// user.value = store.getters.getUser;

// watchEffect(() => {
//   user.value = store.getters.getUser;
// });
const user = computed(()=>{
    return store.getters.getUser
})

const feeds = [
  {
    title: "Friends",
    icon: "mdi-account-group",
    value: "home",
  },
  {
    title: "Pages",
    icon: "mdi-book-open-page-variant",
    value: "account",
  },
  {
    title: "Pages Feed",
    icon: "mdi-flag",
    value: "Pages Feed",
  },
  {
    title: "Event",
    icon: "mdi-calendar",
    value: "Event",
  },
  {
    title: "Saved",
    icon: "mdi-bookmark",
    value: "Event",
  },
  {
    title: "Recomentdations",
    icon: "fa-solid fa-message",
    value: "Event",
  },
  {
    title: "Memories",
    icon: "fa-solid fa-message",
    value: "Event",
  },
];
</script>

<style lang="scss" scoped>
a{
  color: #000;
}
</style>
