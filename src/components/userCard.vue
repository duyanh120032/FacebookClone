<template>
  <router-link :to="`/profile/${user._id}`">
    <v-list-item active-color="primary" rounded="xl" class="user-card">
      <v-avatar size="36px" class="me-3">
        <v-img alt="Avatar" :src="user.avatar"></v-img>
      </v-avatar>
      <v-list-item-title>
        <p>{{ user.fullname }}</p>
        <h6>Friend</h6>
      </v-list-item-title>
    </v-list-item>
  </router-link>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}
.user-card {
  width: 100%;
  &:hover {
    background-color: #f5f5f5;
  }
  //   background-color: #f5f5f5;
}
</style>
