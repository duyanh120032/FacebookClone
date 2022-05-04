<template>
  <v-row class="my-3">
    <v-col v-for="(img, idx) in images" :key="idx" class="d-flex child-flex" cols="4">
      <v-img
        :src="img"
        :lazy-src="`https://picsum.photos/10/6?image=${idx * 5 + 10}`"
        aspect-ratio="1"
        cover
        class="bg-grey-lighten-2"
        v-if="idx <= index"
      >
        <v-btn icon="mdi-close" right="" v-if="onEdit" @click="handleSliceImg(idx)">text</v-btn>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  <v-row class="justify-end me-3">
    <v-btn color="secondary" @click="index += 3" v-if="index < images.lenght">LoadMore</v-btn>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
const index = ref(3);
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  onEdit: {
    type: Boolean,
    default: false,
  },
});
const handleSliceImg = (idx) => {
  props.images.splice(idx, 1);
};
</script>

<style lang="scss" scoped></style>
