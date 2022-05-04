<template>
  <div class="loading">
    <div class="d-flex">
        <v-progress-circular :size="70" :width="7" color="white" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  .v-progress-circular{
    margin: 0 auto;
  }
}
</style>
