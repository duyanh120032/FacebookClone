const loadingModule = {
    state: {
        loading: false,
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        setLoading({ commit }, loading) {
            commit("setLoading", loading);
        }
    }
}
export default loadingModule;