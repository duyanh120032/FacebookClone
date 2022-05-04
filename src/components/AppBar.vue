<template>
  <v-app-bar color="primary" flat class="overflow-visible">
    <!-- <v-avatar color="grey darken-1" size="32"></v-avatar> -->
    <v-btn icon="mdi-facebook" color="secondary" @click="goToHome"></v-btn>
    <v-app-bar-nav-icon class="d-lg-none" @click="toggleSideBarLeft"></v-app-bar-nav-icon>

    <v-toolbar-title class="hidden-md-and-down">
      <v-btn to="/">Home</v-btn>
      <v-btn>Find Friends</v-btn>
    </v-toolbar-title>
    <!-- <v-spacer></v-spacer> -->
    <form class="search-form mt-4" @submit.prevent="searchUsers">
      <input type="text" placeholder="Search" v-model="searchKey" />
      <v-btn icon="mdi-magnify" @click="searchUsers"> </v-btn>
      <v-list v-if="users.length > 0">
        <user-card v-for="user in users" :key="user._id" :user="user" @click="hideSearchUsers" />
      </v-list>
    </form>
    <v-spacer></v-spacer>
    <v-btn :icon="link.icon" v-for="link in links" :key="link.icon"> </v-btn>
    <v-menu anchor="start">
      <template v-slot:activator="{ props }">
        <v-btn color="secondary" dark v-bind="props" icon="mdi-chevron-down-circle-outline"></v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in actions" :key="index">
          <v-list-item-title>
            <v-btn color="success" @click="doAction(item.text)">{{ item.text }}</v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { useStore } from "vuex";
import UserCard from "./userCard.vue";
import { ref, watchEffect } from "vue";
import { searchUsers as searchUsersService } from "../services/userService";
import { useRouter } from "vue-router";
import { logout } from "../services/authService";

const store = useStore();
const router = useRouter();
// const drawer = store.state.toggleSidebar.showSideBar;
const emits = defineEmits(["showSideBarLeft"]);
const toggleSideBarLeft = () => {
  emits("showSideBarLeft");
};
const users = ref([]);
const searchKey = ref("");
const actions = [
  {
    icon: "mdi-account-plus",
    text: "Create a new account",
  },
  {
    icon: "mdi-account-edit",
    text: "Edit account",
  },
  {
    icon: "mdi-account-key",
    text: "Change password",
  },
  {
    icon: "mdi-account-logout",
    text: "Logout",
  },
];
const links = [
  {
    icon: "mdi-account-group",
    to: "/",
  },
  {
    icon: "mdi-message",
    to: "/",
  },
  {
    icon: "mdi-bell",
    to: "/",
  },
  {
    icon: "mdi-comment-question",
    to: "/",
  },
];
const goToHome = () => {
  router.push("/");
};
watchEffect(() => {
  if (searchKey.value === "") {
    users.value = [];
  }
});

const searchUsers = async () => {
  const token = store.getters.getToken;
  const res = await searchUsersService(searchKey.value, token);
  users.value = res;
};
const hideSearchUsers = () => {
  searchKey.value = "";
  users.value = [];
};
const doAction = (text) => {
  switch (text) {
    case "Create a new account":
      console.log("Create a new account");
      break;
    case "Edit account":
      console.log("Edit account");
      break;
    case "Change password":
      console.log("Change password");
      break;
    case "Logout":
      logout(router);
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.search-form {
  position: relative;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  border: none;
  width: 35%;
  height: 35px;

  input {
    width: 100%;
    height: 100%;
    outline: none;
    // background-color: rgb(173, 60, 60);
    // border-radius: 5px;
    border: none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    font-weight: 400;
    position: absolute;
    top: 0;
    left: 0;
  }
  button {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 5px;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    font-weight: 400;
  }

  .v-list {
    width: 100%;
    // height: 100%;
    position: absolute;
    top: 100%;
    transform: translateY(10px);
    left: 0;
    background-color: #fff;
    border-radius: 5px;
    border: none;
    z-index: 9999;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
