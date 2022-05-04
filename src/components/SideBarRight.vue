<template>
  <v-navigation-drawer app v-model="drawer" color="white" position="right" >
    <v-list density="compact" nav color="primary" rounded class="mt-3 mr-2" minHeight="450px">
      <v-list-item color="dark">
        <v-list-item-header class="text-h6">Contacts</v-list-item-header>
      </v-list-item>
      <v-divider class="my-4"></v-divider>
      <fridend-list></fridend-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import FridendList from "./FridendList.vue";
const drawer = ref(true);
// const feeds = [
//   {
//     title: "New Feeds",
//     icon: "fa-solid fa-file-lines",
//     value: "home",
//   },
//   {
//     title: "Pages",
//     icon: "fa-solid fa-message",
//     value: "account",
//   },
//   {
//     title: "Pages Feed",
//     icon: "fa-solid fa-message",
//     value: "Pages Feed",
//   },
//   {
//     title: "Event",
//     icon: "fa-solid fa-message",
//     value: "Event",
//   },
//   {
//     title: "Saved",
//     icon: "fa-solid fa-message",
//     value: "Event",
//   },
//   {
//     title: "Recomentdations",
//     icon: "fa-solid fa-message",
//     value: "Event",
//   },
//   {
//     title: "Memories",
//     icon: "fa-solid fa-message",
//     value: "Event",
//   },
// ];
</script>

<style lang="scss" scoped></style>
