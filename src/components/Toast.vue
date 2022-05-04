<template>
  <div class="Toast">
    <v-card
      class="float-end Toast"
      max-width="344"
      width="300"
      :color="`${type === 'success' ? 'green' : 'red'}`"
    >
      <v-card-header>
        <v-card-title>
          <v-btn icon="mdi-close" left @click="close">mdi-close</v-btn>
          <v-card-header-text class="ma-5">{{ type }}</v-card-header-text>
        </v-card-title>
      </v-card-header>
      <v-card-text>
        <div class="text--primary">
          {{ message }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
defineProps({
  type: {
    type: String,
    default: "success",
  },
  message: {
    type: String,
    default: "",
  },
});
const close = () => {
  store.dispatch("setNotify", {
    type: null,
    msg: null,
  });
};
</script>

<style lang="scss">
.Toast {
  margin: 16px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
}
</style>
