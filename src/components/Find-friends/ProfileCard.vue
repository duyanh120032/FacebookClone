<template>
  <router-link :to="`/profile/${user._id}`">
    <v-card class="mx-auto" max-width="344">
      <v-img :src="user.avatar" height="200px" cover></v-img>

      <v-card-title> {{ user.fullname }} </v-card-title>

      <v-card-subtitle> {{ user.friends.length }}friends </v-card-subtitle>

      <v-card-actions>
        <v-btn flat color="secondary" block v-if="!isFriend" @click="handleAddFriend">
          Add Friend
        </v-btn>
        <v-btn flat color="secondary" block v-if="isFriend"> Friend </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </router-link>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { addFriend } from "../../services/userService";
const store = useStore();
const props = defineProps({
  user: {
    type: Object,
    default: {},
  },
});
const isFriend = computed(() => {
  if (store.getters.getUser._id === props.user._id) {
    return true;
  }
  store.getters.getUser.friends.map((friend) => {
    if (friend._id === props.user._id) {
      return true;
    }
  });
  return false;
});
const token = ref(store.getters.getToken);

const handleAddFriend = () => {
  addFriend(props.user._id, token);
  //   console.log(props.user._id, store.getters.getToken);
};
</script>

<style lang="scss" scoped></style>
