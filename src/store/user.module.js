import { api } from "@/config/axios";
import { db } from "@/config/firebase";
import { deleteDoc, collection, getDocs } from "firebase/firestore";

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
      const { id, texto, foto } = payload;
      const post = state.feed.find((post) => post.id === id);

      if (texto && !foto) {
        post.texto = texto;
      }

      if (!texto && foto) {
        post.foto = foto;
        return;
      }

      if (texto && foto) {
        post.texto = texto;
        post.foto = foto;
        return;
      }
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_ALL_POSTS(state) {
      const postRef = collection(db, "posts");
      const querySnapShot = await getDocs(postRef);
      querySnapShot.forEach(async (docu) => {
        await deleteDoc(docu.ref);
      });
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
      if (search === "") {
        return;
      }

      state.users = state.users.filter((user) =>
        user.email.toLowerCase().startsWith(search.toLowerCase())
      );
    },
    SET_POSTS(state, posts) {
      state.feed = posts;
    },
    LIKE(state, payload) {
      const { id, userId } = payload;
      const post = state.feed.filter((post) => post.id === id);
      const likedBy = post[0].likedBy;

      if (!likedBy.includes(userId)) {
        post[0].likes++;
        likedBy.push(userId);
      } else {
        post[0].likes--;
        post[0].likedBy = likedBy.filter((user) => user !== userId);
      }
    },
    COMMENT_POST(state, payload) {
      const { id } = payload;
      const [post] = state.feed.filter((post) => post.id === id);
      post.coments.push(payload);
    },
  },
  actions: {
    async post({ commit }, post) {
      try {
        await api.post("post/", post);
        commit("ADD_POST", post);
      } catch (error) {
        throw new Error(error);
      }
    },

    async likePost({ commit }, payload) {
      const { id, userId } = payload;
      try {
        await api.put(`/post/like/${id}`, { userId });
        commit("LIKE", { id, userId });
      } catch (error) {
        throw new Error(error);
      }
    },

    async commentPost({ commit }, payload) {
      const { id } = payload;
      try {
        commit("COMMENT_POST", payload);
        await api.put(`post/comment/${id}`, payload);
      } catch (error) {
        throw new Error(`error:${error}`);
      }
    },

    async delete({ commit }, id) {
      try {
        await api.delete(`post-delete/${id}`);
        commit("DELETE_POST", id);
      } catch (error) {
        throw new Error(error);
      }
    },
    async editar({ commit }, payload) {
      try {
        //await api.put(`post-update/${payload.id}`, payload);
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
        const { data } = await api.get("posts");
        commit("SET_POSTS", data);
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
