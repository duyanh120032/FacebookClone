<template>
  <Suspense>
    <template #default>
      <v-card min-width="800px">
        <div class="d-flex justify-center px-10">
          <v-img
            width="100%"
            max-width="700px"
            aspect-ratio="2"
            :src="`${
              user.coverAvatar !== null
                ? user.coverAvatar
                : 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
            }`"
            cover
            rounded
          >
            <v-btn
              color="success"
              v-if="isYourProfile"
              variant="outlined"
              @click="isShowChangeCoverImg = true"
              >Change Cover Image</v-btn
            >
          </v-img>
        </div>
        <div class="">
          <ProfileCard :user="user"></ProfileCard>
        </div>
        <!-- change cover img -->
        <ChangeCoverImage
          v-if="isShowChangeCoverImg"
          @close="isShowChangeCoverImg = false"
          :coverImg="user.coverAvatar"
          @save="updateCoverImg"
        ></ChangeCoverImage>
        <v-divider class="my-4"></v-divider>
        <v-card class="pa-3">
          <v-row>
            <v-col cols="12" sm="4">
              <v-card>
                <v-card-title primary-title> Intro </v-card-title>
                <v-card-text>
                  <span class="d-block"
                    ><v-icon size="32px" class="me-3">mdi-home</v-icon> Lives in Dalat</span
                  >
                  <span class="d-block"
                    ><v-icon size="32px" class="me-3">mdi-map-marker-check</v-icon> From Dalat</span
                  >
                  <span class="d-block"
                    ><v-icon size="32px" class="me-3">mdi-access-point</v-icon>Followed by 299
                    people</span
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="8">
              <Status v-if="isYourProfile"></Status>
              <PostCard v-for="post in userPost" :key="post._id" :post="post" />
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import ProfileCard from "../components/profile/ProfileCard.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getUser } from "../services/userService";
import { watchEffect, ref, computed } from "vue";
import Status from "../components/Status.vue";
import PostCard from "../components/Post/PostCard.vue";
import ChangeCoverImage from "../components/profile/ChangeCoverImage.vue";
import { changeCoverAvatar } from "../services/authService";

const route = useRoute();
const isYourProfile = computed(() => route.params.id === store.getters.getUser._id);
const store = useStore();
const token = await store.getters.getToken;
const user = ref(await getUser(route.params.id, token));
const isShowChangeCoverImg = ref(false);

const userPost = computed(() =>
  store.getters.getPosts.filter((post) => post.user._id === route.params.id)
);
const updateCoverImg = async (coverImg) => {
  if (coverImg) {
    // user.coverAvatar = coverImg;
    changeCoverAvatar(coverImg, token);
    isShowChangeCoverImg.value = false;
  }
};

// const user = await getUser(route.params.id, token);
watchEffect(async () => {
  user.value = await getUser(route.params.id, token);
});
</script>

<style lang="scss" scoped></style>
