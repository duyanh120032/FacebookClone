const postModule = {
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    updatePost(state, post) {
      const index = state.posts.findIndex((p) => p._id === post._id);
      state.posts[index] = post;
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    deletePost(state, post) {
      const index = state.posts.findIndex((p) => p._id === post._id);
      state.posts.splice(index, 1);
    },
    commentPost(state, payload) {
      const index = state.posts.findIndex((p) => p._id === payload.comment.post);
      state.posts[index].comments.push(payload.comment);
    }
  },
  actions: {
    setPosts({ commit }, posts) {
      commit("setPosts", posts);
    },
    addPost({ commit }, post) {
      commit("addPost", post);
    },
    removePost({ commit }, post) {
      commit("deletePost", post);
    },
    likePost({ commit }, post) {
      commit("updatePost", post);
    },
    unlikePost({ commit }, post) {
      commit("updatePost", post);
    },
    commentPost({ commit }, comment) {
      commit("commentPost", comment);
    },
    updatePost({ commit }, post) {
      commit("updatePost", post);
    },
  },
  getters: {
    getPosts(state) {
      //get posts sorted by date
      return state.posts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      // return state.posts;
    },
    getPostsByUser(state) {
      console.log(state);
    },
  },
};
export default postModule;
