<template>
  <div class="edit-profile" @click.self="closeModal">
    <div class="d-flex justify-center align-center">
      <v-card min-width="500px" min-height="900px">
        <v-card-header
          >Edit Profile
          <v-btn icon="mdi-close" class="btn-close" @click="closeModal"></v-btn>
        </v-card-header>
        <v-row class="mx-3">
          <v-col>Profile Picture</v-col>
          <v-col
            ><p
              class="text-right font-weight-light"
              style="cursor: pointer"
              @click="openChangeProfilePicture"
            >
              Edit
            </p></v-col
          >
        </v-row>
        <v-row justify="center">
          <v-avatar size="150px" color="secondary-darken-1">
            <v-img :src="user.avatar"></v-img>
          </v-avatar>
        </v-row>
        <change-image
          v-if="isOpenChangeProfilePicture"
          @close="isOpenChangeProfilePicture = false"
          :user="user"
        ></change-image>
        <v-row class="pa-3">
          <v-col cols="12">
            <v-text-field label="Name" v-model="user.fullname" variant="contained"></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field label="address" v-model="user.address" variant="contained"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="NumberPhone"
              v-model="user.number"
              variant="contained"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Date Of Birth"
              v-model="user.dateOfBirth"
              variant="contained"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-btn class="btn-save" color="success" @click="saveProfile" :disabled="isLoading">
            Save
          </v-btn>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import ChangeImage from "./ChangeProfileImage.vue";
import { updateProfile } from "../../services/userService";

const store = useStore();

const isLoading = computed(() => store.state.isLoading);
const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(["closeModal"]);

const closeModal = () => {
  emits("closeModal");
};
const isOpenChangeProfilePicture = ref(false);
const openChangeProfilePicture = () => {
  isOpenChangeProfilePicture.value = true;
};
const saveProfile = () => {
  updateProfile(
    {
      fullname: props.user.fullname,
      address: props.user.address,
      number: props.user.number,
      dateOfBirth: props.user.dateOfBirth,
    },
    store.getters.getToken
  );
};
</script>

<style lang="scss" scoped>
.edit-profile {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);

  .btn-close {
    position: absolute;
    top: 6px;
    right: 10px;
  }
}
</style>
