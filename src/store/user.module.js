import { users } from "@/data";

const posts = users.reduce((posts, user) => {
  if (user.posts) {
    return posts.concat(user.posts);
  }
  return posts;
}, []);

export default {
  namespace: true,
  state: {
    users: [...users],
    feed: [...posts],
  },
  getters: {
    getAllPosts: function (state) {
      return state.feed;
    },
    getAllUsers: function (state) {
      return state.users;
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
      state.users.push(user);
    },
    FILTER_USERS_LIST(state, search) {
      state.users = state.users.filter((user) =>
        user.username.toLowerCase().startsWith(search.toLowerCase())
      );
    },
  },
  actions: {
    post({ commit }, post) {
      commit("ADD_POST", post);
    },
    delete({ commit }, id) {
      commit("DELETE_POST", id);
    },
    editar({ commit }, payload) {
      commit("EDIT_POST", payload);
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
  },
};
