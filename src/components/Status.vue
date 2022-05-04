<template>
  <v-card rounded="md" class="pa-4" >
    <v-row>
      <v-col cols="1">
        <v-avatar size="32px" color="red">
          <v-img
            src="http://res.cloudinary.com/dzwzvvsd0/image/upload/v1650512101/v-network/jgsnvodbmfir7yobftwl.png"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-col>
          <v-btn color="gray" block="" rounded class="font-weight-bold" @click="toggleSatusModal">What's on your mind ?</v-btn>
          <status-modal v-if="isOpenStatusModal" @close="isOpenStatusModal=false"></status-modal>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import StatusModal from './StatusModal.vue';
const isOpenStatusModal = ref(false);
const toggleSatusModal = () => {
  isOpenStatusModal.value = !isOpenStatusModal.value;
};
</script>

<style lang="scss" scoped></style>
