const authModule = {
  state: () => ({
    user: null,
    token: null,
  }),
  mutations: {
    login(state, { user, token }) {
      state.user = user;
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    setUser(state, user) {
      state.user = user;
    },
    addFriend(state, { user }) {
      state.user.friends.push(user);
    },
    removeFriend(state, { user }) {
      state.user.friends = state.user.friends.filter((friend) => friend._id !== user._id);
    },
    changeCoverAvatar(state, img) {
      state.user.coverAvatar = img;
    },
    savePost(state, { post }) {
      state.user.saved.push(post._id);
    },
    unsavePost(state, { post }) {
      state.user.saved = state.user.saved.filter((id) => id !== post._id);
    }
  },
  actions: {
    login({ commit }, { user, token }) {
      commit("login", { user, token });
    },
    logout({ commit }) {
      commit("logout");
    },
    addFriend({ commit }, { user }) {
      commit("addFriend", { user });
    },
    removeFriend({ commit }, { user }) {
      commit("removeFriend", { user });
    },
    setUser({ commit }, { user }) {
      commit("setUser", { user });
    },
    changeCoverAvatar({ commit }, { img }) {
      commit("changeCoverAvatar", { img });
    },
    savePost({ commit }, { post }) {
      commit("savePost", { post });
    },
    unsavePost({ commit }, { post }) {
      commit("unsavePost", { post });
    }
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
    getFriends(state) {
      return state.user?.friends;
    }
  },
};
export default authModule;
