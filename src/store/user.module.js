import { db } from "@/config/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export default {
  namespace: true,
  state: {
    users: [],
    feed: [],
  },
  getters: {
    getAllPosts: function (state) {
      return state.feed;
    },
    getAllUsers: function (state) {
      return state.users;
    },
    getUserByEmail(state, email) {
      const user = state.users.filter((usuario) => usuario.email === email);
      return user;
    },
  },
  mutations: {
    ADD_POST(state, post) {
      state.feed.unshift(post);
    },
    DELETE_POST(state, id) {
      state.feed = state.feed.filter((post) => post.id !== id);
    },
    EDIT_POST(state, payload) {
      const { id, texto } = payload;
      const post = state.feed.find((post) => post.id === id);
      if (post) {
        post.texto = texto;
      }
    },
    DELETE_ALL_POSTS(state) {
      state.feed = [];
    },
    ADD_USER(state, user) {
      const userAlreadyOnTheList = state.users.find(
        (usuario) => usuario.email === user.email
      );
      if (!userAlreadyOnTheList) {
        state.users.push(user);
      }
      return;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    FILTER_USERS_LIST(state, search) {
      state.users = state.users.filter((user) =>
        user.username.toLowerCase().startsWith(search.toLowerCase())
      );
    },
    SET_POSTS(state, posts) {
      state.feed = posts;
    },
  },
  actions: {
    async post({ commit }, post) {
      try {
        const postRef = doc(db, "posts", post.id);
        await setDoc(postRef, post);
        commit("ADD_POST", post);
      } catch (error) {
        throw new Error(error);
      }
    },
    async delete({ commit }, id) {
      try {
        await deleteDoc(doc(db, "posts", id));
        commit("DELETE_POST", id);
      } catch (error) {
        throw new Error(error);
      }
    },
    async editar({ commit }, payload) {
      try {
        const postRef = doc(db, "posts", payload.id);
        await updateDoc(postRef, payload);
        commit("EDIT_POST", payload);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteAllPosts({ commit }) {
      commit("DELETE_ALL_POSTS");
    },
    filtrar({ commit }, search) {
      commit("FILTER_USERS_LIST", search);
    },
    setUser({ commit }, user) {
      commit("ADD_USER", user);
    },
    async fetchPosts({ commit }) {
      try {
        const querySnapShot = await getDocs(collection(db, "posts"));
        const posts = querySnapShot.docs.map((doc) => doc.data());
        commit("SET_POSTS", posts);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async fetchAllUsers({ commit }) {
      try {
        const querySnapShot = await getDocs(collection(db, "users"));
        const users = querySnapShot.docs.map((doc) => doc.data());
        commit("SET_USERS", users);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
