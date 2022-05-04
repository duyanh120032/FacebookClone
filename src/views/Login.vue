<template>
  <v-row class="justify-center mt-10">
    <v-col cols="9" md="6">
      <v-row class="align-md-center">
        <v-col cols="12" class="text-center text-md-left">
          <h1 class="text-h2 font-weight-bold text-blue">Fakebook</h1>
        </v-col>
        <v-col cols="12">
          <p class="text-h5 text-center text-md-left">
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
          </p>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="9" md="6" lg="4">
     <login-vue/>
    </v-col>
  </v-row>
</template>


<script setup>
import LoginVue from '../components/Login.vue'
</script>

<style lang="scss" scoped></style>
