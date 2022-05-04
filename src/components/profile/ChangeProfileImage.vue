<template>
  <div class="change-image">
    <v-card max-width="600" class="mx-auto">
      <v-btn icon="mdi-close" @click="close" class="btn-close"></v-btn>
      <v-form>
        <v-card-title>
          <span class="headline">Change Profile Picture</span>
        </v-card-title>
        <v-card-text class="d-flex justify-center flex-column align-center">
          <v-avatar size="150px" color="secondary-darken-1">
            <v-img :src="user.avatar"></v-img>
          </v-avatar>
          <!-- <v-file-input
            width="200px"
            v-model="image"
            label="Upload Image"
            prepend-icon="mdi-camera"
            color="primary"
            accept="image/*"
            outlined
          ></v-file-input> -->
          <input type="File" name="" id="" placeholder="file..." ref="imageRef" class="d-none">
          <v-btn color="success" @click="selectImg">Select Img</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import {changeProfilPicture} from '../../services/userService'


const emits = defineEmits(["close"]);
const store = useStore()
const token = store.getters.getToken
const imageRef = ref(null);

const close = () => {
  emits("close");
};
const save = () => {
  if(imageRef.value.files[0]!==undefined){
      changeProfilPicture(imageRef.value.files[0],token)
  }
};
const selectImg = () => {
  imageRef.value.click();
};
defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

</script>

<style lang="scss" scoped>
.change-image {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  overflow: hidden;

  .btn-close {
    position: absolute;
    top: 10px;
    right: 20px;
  }
}
</style>
