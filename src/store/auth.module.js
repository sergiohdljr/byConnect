import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  updatePassword,
  signOut,
} from "firebase/auth";
import { auth, db, githubProvider, googleProvider } from "@/config/firebase";
import router from "../router/index";
import { doc, setDoc } from "firebase/firestore";

export default {
  namespace: true,
  state: { user: null },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    async SAVE_USER(state, user) {
      const userObj = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAnonimous: user.isAnonymous,
        providerId: user.providerData[0].providerId,
        createdAt: user.metadata.createdAt,
        lastLoginAt: user.metadata.lastLoginAt,
      };
      const usersRef = doc(db, "users", userObj.email);
      await setDoc(usersRef, userObj);
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
        throw new Error(error.code);
      }

      commit("SET_USER", auth.currentUser);
    },

    async googleSignIn({ commit }) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        throw new Error(error.code);
      }

      commit("SET_USER", auth.currentUser);
      commit("SAVE_USER", auth.currentUser);
    },

    async githubSignIn({ commit }) {
      try {
        await signInWithPopup(auth, githubProvider);
      } catch (error) {
        throw new Error(error.code);
      }

      commit("SET_USER", auth.currentUser);
      commit("SAVE_USER", auth.currentUser);
    },

    async register({ commit }, payload) {
      const { email, password } = payload;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/register/profile");
      } catch (error) {
        throw new Error(error.code);
      }
      commit("SET_USER", auth.currentUser);
      commit("SAVE_USER", auth.currentUser);
    },
    async logout({ commit }) {
      router.push("/");
      await signOut(auth);
      commit("CLEAR_USER");
    },
    async fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    async updateUserInfo({ commit }, UserPayload) {
      const user = auth.currentUser;
      try {
        await updateProfile(user, UserPayload);
      } catch (error) {
        throw new Error(error.code);
      }
      commit("SAVE_USER", user);
    },
    async deleteUser({ commit }) {
      try {
        await auth.currentUser.delete();
        commit("CLEAR_USER");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async changePassword({ commit }, novaSenha) {
      const user = auth.currentUser;
      try {
        await updatePassword(user, novaSenha);
        commit("CLEAR_USER");
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
