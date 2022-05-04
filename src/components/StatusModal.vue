<template>
  <div class="status-modal" @click.self="hide">
    <v-card class="mx-auto" max-width="344" color="white">
      <v-card-header>
        <div class="text-overline">Create Post</div>
      </v-card-header>
      <v-divider class="my-2"></v-divider>
      <VCardSubtitle>
        <v-avatar size="32px" color="red">
          <v-img
            src="http://res.cloudinary.com/dzwzvvsd0/image/upload/v1650512101/v-network/jgsnvodbmfir7yobftwl.png"
          ></v-img>
        </v-avatar>
        <v-card-text>Duy Anh</v-card-text>
      </VCardSubtitle>
      <VCardText>
        <v-textarea
          solo
          name="input-7-4"
          label="What's on your mind?"
          v-model="content"
        ></v-textarea>
        <v-row v-if="imgs">
          <v-col
            cols="4"
            v-for="(img, idx) in imgs"
            :key="idx"
            class="px-1"
            style="position: relative"
          >
            <img :src="createSrc(img)" alt="" width="100" height="100" />
            <v-btn
              color="warning"
              icon="mdi-close"
              size="16px"
              style="position: absolute; top: 10px; right: 0"
              @click="handleSliceImg(idx)"
            ></v-btn>
          </v-col>
        </v-row>

        <div>
          <v-btn
            color="success"
            icon="mdi-image-multiple"
            class="me-5"
            @click="handleOpenImg"
          ></v-btn>
          <v-btn color="success" icon="mdi-camera"></v-btn>
          <input type="file" name="" id="" ref="imgRef" class="d-none" />
        </div>
      </VCardText>
      <v-card-actions>
        <v-btn variant="outlined" block @click="handlePost"> Post </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { createPost } from "../services/PostServices";
import { useStore } from "vuex";

const store = useStore();
const emits = defineEmits(["close"]);

const imgRef = ref(null);
const imgs = ref([]);
const content = ref("");

const handleOpenImg = () => {
  imgRef.value.click();
};
const handleSliceImg = (idx) => {
  imgs.value.splice(idx, 1);
};
const createSrc = (img) => {
  //   console.log(img);
  return URL.createObjectURL(img);
};
watchEffect(() => {
  if (imgRef.value) {
    const files = imgRef.value.files;
    imgRef.value.addEventListener("change", () => {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          imgs.value.push(files[i]);
        }
      }
    });
  }
});

const handlePost = async () => {
  //  check content
  if (content.value.length <= 0) {
    return emits("close");
  }
  if (imgs.value.length > 0) {
    //   upload image
    //   post
    await createPost(store.getters.getToken, {
      content: content.value,
      images: imgs.value,
    });
  } else {
    await createPost(store.getters.getToken, { content: content.value });
  }
};
const hide = () => {
  emits("close");
};
</script>

<style lang="scss" scoped>
.status-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  .v-card {
    margin-top: 20%;
  }
}
</style>
