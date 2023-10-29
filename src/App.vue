<template>
  <BaseLayoutApp>
    <template v-slot:navigation>
      <NavBarComponent
        v-if="user"
        :user="user"
        :delete-all-posts="DeleteAllPosts"
      />
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
      user: null,
    };
  },
  methods: {
    DeleteAllPosts() {
      this.feed = [];
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
  async created() {
    await this.$store.dispatch("fetchUser");
    await this.waitForCurrentUser();

    this.user = {
      nome: auth.currentUser.displayName,
      username: auth.currentUser.email,
      fotoPerfil: auth.currentUser.photoURL,
    };
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
