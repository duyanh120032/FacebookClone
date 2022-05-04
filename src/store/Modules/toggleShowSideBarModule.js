const toggleShowSideBarModule = {
  state: {
    showSideBar: false,
  },
  mutations: {
    toggleShowSideBar(state) {
      state.showSideBar = !state.showSideBar;
    },
  },
  actions: {
    toggleShowSideBar({ commit }) {
      commit("toggleShowSideBar");
    },
  },
};
export default toggleShowSideBarModule;
