import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import router from "../router/index";

export default {
  namespace: true,
  state: { user: null },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, payload) {
      const { email, password } = payload;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error.code);
        return;
      }

      commit("SET_USER", auth.currentUser);
    },

    async googleSignIn({ commit }) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.log(error.code);
        return;
      }

      commit("SET_USER", auth.currentUser);
      console.log(auth.currentUser);
    },

    async register(details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("cadastro realizado com sucesso");
      } catch (error) {
        console.log(error.code);
        return;
      }
    },
    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");
      router.push("/login");
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);

          if (router.currentRoute.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
};
