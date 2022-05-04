<template>
  <v-row class="align-start">
    <v-col cols="1" class="mt-3 d-flex flex-column pa-0">
      <v-avatar size="32px" color="red">
        <v-img
          src="http://res.cloudinary.com/dzwzvvsd0/image/upload/v1650512101/v-network/jgsnvodbmfir7yobftwl.png"
        ></v-img>
      </v-avatar>
      <small>{{ moment(comment.createdAt).fromNow() }}</small>
    </v-col>
    <v-col>
      <v-card class="pa-3" rounded="20" contained-text>
        <v-row class="pa-3 font-weight-bold">{{ comment.user.fullname }}</v-row>
        <v-row class="pa-3 justify-space-between align-center">
          {{ comment.content }}
          <div class="info">
            <v-menu transition="slide-x-transition">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-dots-vertical" variant="plain"> </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" @click="doAction(item.title)">
                  <v-list-item-title>
                    <v-icon>{{ item.icon }}</v-icon>
                    {{ item.title }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import moment from "moment";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  comment: {
    type: Object,
    default: () => ({
      id: 1,
      content: "",
      user: {
        id: 1,
        name: "",
        avatar: "",
      },
    }),
  },
});
const items = ref([]);

const doAction = (title) => {
  if (title === "Delete Comment") {
    alert("Delete Comment");
    // store.dispatch("deleteComment", comment.id);
  }
};
watchEffect(() => {
  if (props.comment.user._id === store.getters.getUser._id) {
    items.value = [
      { title: "Edit Comment", icon: "mdi-pencil" },
      { title: "Delete Comment", icon: "mdi-delete" },
    ];
  } else {
    items.value = [{ title: "Report Comment", icon: "mdi-flag" }];
  }
});
</script>

<style lang="scss" scoped></style>
