 const suggestionsModule =  {
    state:()=>({
        suggestions: [],
    }),
    mutations:{
        setSuggestions(state, suggestions){
            const { suggestions:suggestionsUser } = suggestions;
            state.suggestions = suggestionsUser;
        }
    },
    actions:{
       setSuggestions({commit}, suggestions){
              commit("setSuggestions", suggestions);
       }
    },
    getters:{
        getSuggestions(state){
            return state.suggestions;
        }
    }

}
export default suggestionsModule;