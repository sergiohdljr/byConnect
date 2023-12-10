<template>
  <div>
    <v-toolbar fixed elevation="5" height="80px">
      <div class="manu-wrapper">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu-open</v-icon>
        </v-btn>
        <div @click="backToTimeline" role="button" class="logo-nav">
          <img class="icon" src="../../assets/logo.png" alt="logo" />
        </div>
        <div class="swish-theme">
          <v-switch
            v-model="$vuetify.theme.dark"
            :append-icon="themeIcon"
            inset
          />
        </div>
      </div>
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
              <v-icon color="primary">{{ item.icon }}</v-icon>
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
            <v-icon color="primary">mdi-logout</v-icon>
            <p>Sair</p>
          </button>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    deleteAllPosts: Function,
  },
  data() {
    return {
      darkTheme: true,
      username: this.$route.params.username,
      drawer: null,
      items: [
        { title: "Time Line", icon: "mdi-view-dashboard", redirect: "/" },
        {
          title: "Perfil",
          icon: "mdi-account",
          redirect: `/User-profile/${this.user.email}`,
        },
        {
          title: "Todos Usuários",
          icon: "mdi-account-group",
          redirect: "/Users",
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
        {
          title: "Noticias",
          icon: "mdi-newspaper-variant-multiple-outline",
          redirect: "/news",
        },
      ],
    };
  },
  computed: {
    isOnTimeline() {
      return this.$route.path === "/";
    },
    themeIcon() {
      return this.$vuetify.theme.isDark
        ? "mdi-weather-night"
        : "mdi-white-balance-sunny";
    },
  },
  methods: {
    Logout() {
      this.$store.dispatch("logout");
    },
    backToTimeline() {
      if (this.$route.path !== "/") this.$router.push("/");
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
  margin-right: 1rem;
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

.logo-nav {
  width: 48px;
  height: 48px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  :hover {
    opacity: 50%;
    cursor: pointer;
  }
}

.icon {
  width: 24px;
  height: 24px;
  -webkit-filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
  filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
}
</style>
