<template>
  <app-bar @show-side-bar-left="drawer=!drawer"></app-bar>
  <side-bar-left :drawer="drawer"></side-bar-left>
  <v-main>
    <v-card min-height="200px">
      <v-container>
        <slot />
      </v-container>
    </v-card>
  </v-main>
  <side-bar-right  />
</template>

<script setup>
import { ref ,defineEmits} from "vue";
import AppBar from "../components/AppBar.vue";
import SideBarLeft from "../components/SideBarLeft.vue";
import SideBarRight from "../components/SideBarRight.vue";

const drawer = ref(true);



</script>

<style lang="scss" scoped></style>
