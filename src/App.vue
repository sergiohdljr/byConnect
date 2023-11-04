<template>
  <BaseLayoutApp>
    <template v-slot:navigation>
      <NavBarComponent
        v-if="showNav"
        :user="user"
        :delete-all-posts="DeleteAllPosts"
      />
    </template>
    <template v-slot:content>
      <LoadingComponent v-if="pageLoading" />
      <router-view v-else />
    </template>
  </BaseLayoutApp>
</template>
<script>
import NavBarComponent from "./components/Navigation/NavBarComponent.vue";
import LoadingComponent from "./components/LoadingComponent.vue";
import BaseLayoutApp from "./layout/BaseLayoutApp.vue";
import { auth } from "./config/firebase";

export default {
  components: {
    NavBarComponent,
    BaseLayoutApp,
    LoadingComponent,
  },
  data() {
    return {
      user: null,
      currentUser: null,
      showNav: false,
      pageLoading: true,
    };
  },
  methods: {
    DeleteAllPosts() {
      this.$store.dispatch("deleteAllPosts");
    },
    waitForCurrentUser() {
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            resolve(user);
          }
          unsubscribe();
        });
      });
    },
  },
  watch: {
    user(novoUsuario) {
      if (novoUsuario) {
        this.showNav = true;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.pageLoading = false;
    }, 1200);
  },
  async created() {
    await this.$store.dispatch("fetchUser");
    await this.waitForCurrentUser();

    this.currentUser = this.$store.state.auth.user;

    this.user = {
      nome: this.currentUser.displayName,
      username: this.currentUser.email,
      fotoPerfil: this.currentUser.photoURL,
    };

    const currentUser = {
      nome: this.user.nome,
      username: this.user.username,
      fotoPerfil: this.user.fotoPerfil,
      email: this.user.username,
      age: "",
      endereco: "",
      numberOfPosts: "Ainda não possui Postagens",
      privateProfile: auth.currentUser.isAnonymous,
      posts: [],
    };
    this.$store.dispatch("setUser", currentUser);
  },
};
</script>

<style>
* {
  margin: 0;
  border: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  font-style: none;
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>
