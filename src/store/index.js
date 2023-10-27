import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth.module";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: authModule,
  },
});

export { store };
