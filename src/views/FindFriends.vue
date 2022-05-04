<template>
  <div>
    <v-card class="py-4">
      <v-row class="px-2">
        <v-col cols="4" md="3" v-for="user in userSuggestions" :key="user._id">
          <profile-card :user="user"></profile-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import ProfileCard from "../components/Find-friends/ProfileCard.vue";
import { useStore } from "vuex";
import { suggestionsUser } from "../services/userService";
import {computed} from "vue";

const store = useStore();
await suggestionsUser(store.getters.getToken);

const userSuggestions = computed(() => {
  return store.getters.getSuggestions;
});
</script>

<style lang="scss" scoped></style>
