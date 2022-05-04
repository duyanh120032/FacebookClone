const notifyModule = {
  state: {
    msg: null,
    type: null,
  },
  mutations: {
    setNotify(state, { msg, type }) {
      state.msg = msg;
      state.type = type;
    },
    closeNotify(state) {
      state.msg = null;
      state.type = null;
    }
  },
  actions: {
    setNotify({ commit }, { msg, type }) {
      commit("setNotify", { msg, type });
    },
    closeNotify({ commit }) {
      commit("closeNotify");
    }
  },
};
export default notifyModule;
