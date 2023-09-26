<template>
  <v-app>
    <v-main>
      <ToolbarComponent :data-user="user" />
    </v-main>
  </v-app>
</template>

<script>
import ToolbarComponent from "./components/ToolbarComponent.vue";
import { user } from "./data";

export default {
  name: "App",

  components: { ToolbarComponent },

  data() {
    return {
      user,
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
