<template>
  <v-app>
    <v-main>
      <ToolbarComponent :data-user="user" :delete-all-posts="DeleteAllPosts" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import ToolbarComponent from "./components/ToolbarComponent.vue";

export default {
  components: {
    ToolbarComponent,
  },
  data() {
    const user = {
      nome: "Sérgio H. de Lima Jr.",
      username: "sergiohdljr",
      fotoPerfil: "https://avatars.githubusercontent.com/u/102623806?v=4",
    };
    return {
      user,
    };
  },
  methods: {
    DeleteAllPosts() {
      this.feed = [];
    },
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
