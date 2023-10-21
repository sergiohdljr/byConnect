<template>
  <BaseLayoutApp>
    <template v-slot:navigation>
      <NavBarComponent :data-user="user" delete-all-posts="DeleteAllPosts" />
    </template>
    <template v-slot:content>
      <router-view />
    </template>
  </BaseLayoutApp>
</template>
<script>
import NavBarComponent from "./components/Navigation/NavBarComponent.vue";
import BaseLayoutApp from "./layout/BaseLayoutApp.vue";

export default {
  components: {
    NavBarComponent,
    BaseLayoutApp,
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
