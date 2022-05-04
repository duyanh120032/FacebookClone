<template>
  <v-main>
    <v-card min-height="80vh" color="#f0f2f5">
      <v-container>
        <slot />
      </v-container>
    </v-card>
    <v-card min-height="20vh">
      <footer-vue></footer-vue>
    </v-card>
  </v-main>
</template>

<script setup>
import FooterVue from "../components/Footer.vue";
</script>

<style lang="scss" scoped></style>
