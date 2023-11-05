<template>
  <div>
    <v-toolbar elevation="5" height="80px">
      <div class="manu-wrapper">
        <v-btn @click.stop="drawer = !drawer">
          <v-icon>mdi-menu-open</v-icon>
        </v-btn>
        <div class="swish-theme">
          <v-switch v-model="$vuetify.theme.dark" inset></v-switch>
        </div>
      </div>
      <ButtonDeleteAll v-if="isOnTimeline" :delete-all="deleteAllPosts" />
    </v-toolbar>
    <v-sheet height="100%" width="344" class="overflow-hidden">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="user.photoURL"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list v-for="(item, index) in items" :key="index" dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <router-link :to="item.redirect"
                ><p>{{ item.title }}</p></router-link
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list class="logout-btn">
          <button @click="Logout">
            <v-icon>mdi-logout</v-icon>
            <p>Sair</p>
          </button>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
import ButtonDeleteAll from "../ButtonDeleteAll.vue";

export default {
  components: {
    ButtonDeleteAll,
  },
  props: {
    user: Object,
    deleteAllPosts: Function,
  },
  data() {
    return {
      username: this.$route.params.username,
      drawer: null,
      items: [
        { title: "Time Line", icon: "mdi-view-dashboard", redirect: "/" },
        { title: "Todos Usuários", icon: "mdi-forum", redirect: "/Users" },
        {
          title: "Perfil",
          icon: "mdi-account",
          redirect: `/User-profile/${this.user.email}`,
        },
        {
          title: "Posts",
          icon: "mdi-post",
          redirect: `/Posts/${this.user.email}`,
        },
        {
          title: "Configurações",
          icon: "mdi-cog",
          redirect: `/Configuration`,
        },
      ],
    };
  },
  computed: {
    isOnTimeline() {
      return this.$route.path === "/";
    },
  },
  methods: {
    Logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
.manu-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.delete-all-button {
  cursor: pointer;
}

.swish-theme {
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
}

.logout-btn {
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
}

.logout-btn > button {
  display: flex;
  gap: 2rem;
}

.link-style {
  color: white;
  text-decoration: none !important;
}
</style>
