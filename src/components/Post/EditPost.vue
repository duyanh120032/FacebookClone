<template>
  <div class="edit-post">
    <v-card min-height="200px" min-width="500px" class="pa-3">
      <v-card-title primary-title class="justify-space-between">
        Edit Post

        <v-btn icon="mdi-close" @click="emits('close')">text</v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          variant="contained"
          v-model="post.content"
        ></v-text-field>
        <PostImgs :images="post.images" :onEdit="true" ></PostImgs>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" flat @click="emits('save')">Save</v-btn>
        <v-btn color="warning" flat @click="emits('close')">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import PostImgs from './PostImgs.vue';
const emits = defineEmits(["close", "save"]);

defineProps({
  post: {
    type: Object,
    default: () => ({
      title: "",
    }),
  },
});
</script>

<style lang="scss" scoped>
.edit-post {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
