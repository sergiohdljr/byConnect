<template>
  <v-app>
    <v-main>
      <ToolbarComponent :data-user="user" />
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="11" md="8" lg="6">
            <FormPostComponent
              @Post="Publicar"
              :user-profile="user.fotoPerfil"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ToolbarComponent from "./components/ToolbarComponent.vue";
import FormPostComponent from "./components/FormPostComponent.vue";

export default {
  name: "App",

  components: { ToolbarComponent, FormPostComponent },

  data() {
    const user = {
      nome: "Sérgio H. de Lima Jr.",
      username: "sergiohdljr",
      fotoPerfil: "https://avatars.githubusercontent.com/u/102623806?v=4",
    };
    return {
      user,
      feed: [],
    };
  },
  methods: {
    Publicar(dados) {
      const NovaPublicacao = {
        texto: dados,
        foto: "",
        datetime: new Date(),
        user: this.user,
      };
      this.feed.push(NovaPublicacao);
      console.log(NovaPublicacao);
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
