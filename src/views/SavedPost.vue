<template>
  <PostCard v-for="post in savedPosts" :key="post._id" :post="post" />
</template>

<script setup>
import PostCard from "../components/SavedPost/PostCard.vue";
import { getSavedPosts } from "../services/PostServices";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const savedPosts = ref(await getSavedPosts(store.getters.getToken));


</script>

<style lang="scss" scoped></style>
