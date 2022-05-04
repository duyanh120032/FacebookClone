<template>
  <v-card class="pa-5 my-5" contained-text>
    <v-row class="justify-space-between">
      <div class="d-flex align-center">
        <v-avatar size="32px" color="red">
          <v-img :src="post.user.avatar"></v-img>
        </v-avatar>
        <div class="d-flex flex-column ma-2">
          <span
            ><router-link :to="`/profile/${post.user._id}`">{{
              post.user.fullname
            }}</router-link></span
          >
          <small>{{ moment(post.createdAt).fromNow() }}</small>
        </div>
      </div>
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
    <v-divider class="my-4"></v-divider>
    <v-row>
      <p>
        {{ post.content }}
        <v-btn color="" variant="plain" v-if="isReadMore">ReadMore</v-btn>
      </p>
    </v-row>
    <!-- <v-divider class="my-4"></v-divider> -->
    <post-imgs :images="post.images"></post-imgs>
    <v-divider class="my-4"></v-divider>
    <v-row class="justify-space-between">
      <div>
        <v-icon color="secondary" class="mx-2">mdi-thumb-up</v-icon> {{ post.likes.length }}
      </div>
      <div>{{ post.comments.length }} Comments</div>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="4">
        <v-btn variant="plain" block :color="`${isLiked ? 'warning' : ''}`" @click="handleLikePost">
          <v-icon>mdi-thumb-up</v-icon>
          Like
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn variant="plain" block @click="isFocus = true">
          <v-icon>mdi-comment</v-icon>
          Comment
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn variant="plain" block>
          <v-icon>mdi-share-circle</v-icon>
          Share
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="align-start">
      <v-col cols="1" class="mt-3">
        <v-avatar size="32px" color="red">
          <v-img :src="post.user.avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <v-text-field
          label="Comment"
          variant="contained"
          :autofocus="isFocus"
          @keyup.enter="handlePostComment"
          v-model="commentContent"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- comments -->
    <div v-for="(comment, index) in post.comments" :key="comment._id">
      <post-comment v-if="index < indexComment" :comment="comment"></post-comment>
    </div>

    <v-btn
      color="success"
      variant="plain"
      class="float-right"
      @click="indexComment = indexComment + 3"
      v-if="indexComment < post.comments.length"
      >Show More</v-btn
    >
    <!-- edit post compoent -->
    <edit-post
      v-if="onEdit"
      @close="onEdit = false"
      :post="post"
      @save="handleSavePost(post)"
    ></edit-post>
  </v-card>
</template>

<script setup>
import { ref, watchEffect, reactive } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import PostImgs from "./PostImgs.vue";
import {
  likePost,
  unlikePost,
  deletePost,
  commentPost,
  updatePost,
  savePost,
} from "../../services/PostServices";
import PostComment from "./PostComment.vue";
import EditPost from "./EditPost.vue";

const store = useStore();
const isReadMore = ref(false);
const onEdit = ref(false);
const commentContent = ref("");
const indexComment = ref(3);
const props = defineProps({
  post: {
    type: Object,
    default: () => ({
      id: 1,
      title: "",
      content: "",
      user: {
        id: 1,
        name: "",
        avatar: "",
      },
      comments: [],
      likes: [],
    }),
  },
});
const doAction = async (action) => {
  if (action === "Delete Post") {
    await deletePost(props.post._id, store.getters.getToken);
  }
  if (action === "Edit Post") {
    onEdit.value = true;
  }
  if (action === "Save Post") {
    await savePost(props.post._id, store.getters.getToken);
  }
};
const handlePostComment = async () => {
  await commentPost(props.post._id, store.getters.getToken, commentContent.value);
  commentContent.value = "";
};
const handleSavePost = async (post) => {
  // await store.dispatch("updatePost", post);
  console.log({ id: post._id, images: post.images, content: post.content });
  await updatePost(post._id, store.getters.getToken, {
    images: post.images,
    content: post.content,
  });
  onEdit.value = false;
};
const isFocus = ref(false);
const isLiked = ref(false);
const items = ref([
  { title: "Save Post", icon: "mdi-heart" },
  { title: "Share Post", icon: "mdi-share" },
  { title: "Delete Post", icon: "mdi-delete" },
]);

watchEffect(() => {
  if (props.post.content.length > 100) {
    isReadMore.value = true;
  }
});
watchEffect(() => {
  if (props.post.user._id === store.getters.getUser._id) {
    items.value = [
      { title: "Edit Post", icon: "mdi-pencil" },
      { title: "Save Post", icon: "mdi-heart" },
      { title: "Share Post", icon: "mdi-share" },
      { title: "Delete Post", icon: "mdi-delete" },
    ];
  } else {
    items.value = [
      { title: "Save Post", icon: "mdi-heart" },
      { title: "Share Post", icon: "mdi-share" },
    ];
  }
});

watchEffect(() => {
  const user = store.getters.getUser;
  if (props.post.likes.includes(user._id)) {
    isLiked.value = true;
  }
});
// if (props.post.content.length > 100) {
//   isReadMore.value = true;
// }

const handleLikePost = () => {
  if (isLiked.value === false) {
    likePost(props.post._id, store.getters.getToken);
    isLiked.value = true;
  } else {
    unlikePost(props.post._id, store.getters.getToken);
    isLiked.value = false;
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #000;
}
</style>
