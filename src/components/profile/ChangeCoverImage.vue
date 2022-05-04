<template>
  <div class="change-coverImg d-flex justify-center align-center">
    <v-card min-height="500px" min-width="600px">
      <v-card-title>
        <v-btn icon @click="emits('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="handleSave">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-card-title>
      <v-img
        :src="`${imgUrl ? imgUrl : coverImg}`"
        max-width="500"
        max-height="300"
        class="mx-auto"
      >
      </v-img>
      <input
        type="file"
        id="coverImg"
        name="coverImg"
        ref="imgRef"
        class="d-none"
        @change="onChangeImg"
      />
      <div class="d-flex justify-center my-3">
        <v-btn color="success" icon="mdi-camera-image" @click="openChangeImg">text</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const emits = defineEmits(["close", "save"]);

const imgRef = ref(null);
const imgUrl = ref(null);
const props = defineProps({
  coverImg: {
    type: String,
    default: "https://picsum.photos/id/11/100/60",
  },
});
const openChangeImg = () => {
  imgRef.value.click();
};
const handleSave = () => {
  emits("save", imgRef.value.files[0]);
};
const onChangeImg = () => {
  imgUrl.value = URL.createObjectURL(imgRef.value.files[0]);
};
</script>

<style lang="scss" scoped>
.change-coverImg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
</style>
