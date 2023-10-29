import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth.module";
import userModule from "./user.module";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    user: userModule,
  },
});

export { store };
