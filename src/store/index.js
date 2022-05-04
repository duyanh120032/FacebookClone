// create store by using vuex
import { createStore } from "vuex";
import authModule from "./Modules/authModule";
import notifyModule from "./Modules/NotifyModule";
import loadingModule from "./Modules/loadingModule";
import postModule from "./Modules/postModule";
import  suggestionsUser  from "./Modules/suggestionsModule";


const store = createStore({
  modules: {
    // add modules here
    auth: authModule,
    notify: notifyModule,
    loading: loadingModule,
    post: postModule,
    suggestions: suggestionsUser,
  },
});

export default store;
