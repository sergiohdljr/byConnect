<template>
  <BaseLayoutApp>
    <template v-slot:navigation>
      <NavBarComponent :user="user" :delete-all-posts="DeleteAllPosts" />
    </template>
    <template v-slot:content>
      <router-view />
    </template>
  </BaseLayoutApp>
</template>
<script>
import NavBarComponent from "./components/Navigation/NavBarComponent.vue";
import BaseLayoutApp from "./layout/BaseLayoutApp.vue";
import { auth } from "./config/firebase";

export default {
  components: {
    NavBarComponent,
    BaseLayoutApp,
  },
  data() {
    return {
      user: {
        nome: auth.currentUser.displayName,
        username: auth.currentUser.email,
        fotoPerfil: auth.currentUser.photoURL,
      },
    };
  },
  methods: {
    DeleteAllPosts() {
      this.feed = [];
    },
  },
  beforeCreate() {
    this.$store.dispatch("fetchUser");
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
