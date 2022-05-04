<template>
  <!-- <v-list-item
    :prepend-icon="feed.icon"
    :title="feed.title"
    :value="feed.value"
    v-for="feed in feeds"
    :key="feed.title"
  ></v-list-item> -->
  <v-card class="mx-3 my-2 px-2">
    <router-link :to="`/profile/${friend._id}`">
      <v-list-item two-line :prepend-avatar="friend.avatar" :title="friend.fullname"></v-list-item>
    </router-link>
  </v-card>
</template>

<script setup>
defineProps({
  friend: {
    type: Object,
    default: () => ({
      name: "",
      avatar: "",
    }),
  },
});
</script>

<style lang="scss" scoped></style>
