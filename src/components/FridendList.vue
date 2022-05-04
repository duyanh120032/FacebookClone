<template>
  <div>
    <v-text-field
      color="secondary"
      label="Search Friends.."
      variant="outlined"
      class="px-3"
      v-model="searchKey"
    ></v-text-field>
    <!-- <h4 class="text-secondary mx-3">Feed</h4> -->
    <contact v-for="friend in friendList" :key="friend._id" :friend="friend" />
  </div>
</template>

<script setup>
import Contact from "./Contact.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";
const store = useStore();

const searchKey = ref("");
const friendList = computed(() => {
  const friends = store.getters.getFriends;
  // seacrhKey.value;
  if (!searchKey.value) {
    return friends;
  }
  return friends.filter((friend) => {
    return friend.fullname.toLowerCase().includes(searchKey.value.toLowerCase());
  });
});
</script>

<style lang="scss" scoped></style>
