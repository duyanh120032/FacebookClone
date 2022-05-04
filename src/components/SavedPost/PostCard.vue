<template>
  <v-card class="my-3">
    <v-row class="pa-3">
      <v-col cols="3">
        <v-img
          size="100"
          :src="`${
            post.images[0] ? post.images[0] : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
          }`"
          cover
        ></v-img>
      </v-col>
      <v-col>
        <v-card-title primary-title> {{ post.content }} </v-card-title>
        <v-card-text> From: {{ post.user.fullname }} </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="$router.push('/post')">View</v-btn>
          <v-btn color="error" @click="$router.push('/post')">Delete</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    default: null,
  },
});
</script>

<style lang="scss" scoped></style>
