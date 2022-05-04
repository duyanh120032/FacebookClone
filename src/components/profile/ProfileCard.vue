<template>
  <v-card>
    <v-card-title>
      <v-avatar size="150" class="profile-card-avatar justify-space-between">
        <v-img alt="Avatar" :src="user.avatar"></v-img>
      </v-avatar>
      <v-card-title text class="info">
        <div class="d-flex flex-column info">
          <span class="text-h4 font-weight-bold">{{ user.fullname }}</span>
          <p class="text-h6 text-success font-weight-thin">
            <span class="my-3">{{ user.friends.length }}friends</span> <span>1 mutual</span>
          </p>
        </div>
        <v-btn @click="handleAddFriend" v-if="!isFriend && !isYourSelf">Add Fridend</v-btn>
        <v-btn @click="isOnEdit = !isOnEdit" v-if="isYourSelf" color="primary">Edit Profile</v-btn>
        <edit-profile v-if="isOnEdit" @close-modal="isOnEdit=!isOnEdit" :user="auth"></edit-profile>
        <v-menu anchor="start" v-if="isFriend && !isYourSelf">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark v-bind="props">
              <v-icon>mdi-account-check</v-icon> Friend</v-btn
            >
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in actions" :key="index">
              <v-list-item-title>
                <!-- <router-link to="/" class="mx-4">{{ item.text }}</router-link> -->
                <v-btn @click="doAction(item.function)">
                  <v-icon>{{ item.icon }}</v-icon>
                  {{ item.text }}</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
    </v-card-title>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";
import { addFriend, removeFriend } from "../../services/userService";
import EditProfile from "./EditProfile.vue";

const store = useStore();

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});
const auth = ref(store.getters.getUser);
const token = ref(store.getters.getToken);
const isFriend = ref(false);
const isYourSelf = ref(false);
const isOnEdit = ref(false);

const doAction = (functionName) => {
  if (functionName === "removeFriend") {
    handleRemoveFriend();
  }
};
const handleAddFriend = () => {
  addFriend(props.user._id, token);
  isFriend.value = true;
};
const handleRemoveFriend = () => {
  removeFriend(props.user._id, token);
  isFriend.value = false;
};
watchEffect(() => {
  props.user.friends.forEach((friend) => {
    if (friend._id === auth.value._id) {
      isFriend.value = true;
    }
  });
});
watchEffect(() => {
  if (props.user._id === auth.value._id) {
    isYourSelf.value = true;
  }
});

const actions = [
  {
    text: "Favorites",
    icon: "mdi-heart",
    function: "addFavorite",
  },
  {
    text: "Unfollow",
    icon: "mdi-account-plus",
    function: "Unfollow",
  },
  {
    text: " UnFriend",
    icon: "mdi-account-minus",
    function: "removeFriend",
  },
];
</script>

<style lang="scss" scoped>
.profile-card-avatar {
  width: 100%;
  height: 100%;
  background-color: rgb(29, 28, 27);
  border-radius: 50%;
  margin-top: -100px;
  margin-left: 50px;
  position: relative;
  z-index: 1000;
}
.v-card {
  overflow: visible;
  .info {
    width: 100%;
    flex: 1;
  }
}
a {
  text-decoration: none;
  font-weight: 500;
}
</style>
