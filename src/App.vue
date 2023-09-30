<template>
  <v-app>
    <v-main>
      <ToolbarComponent :data-user="user" :delete-all-posts="DeleteAllPosts" />
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="11" md="8" lg="6">
            <FormPostComponent
              @Post="Publicar"
              :user-profile="user.fotoPerfil"
            />
            <v-container fluid v-if="feed.length > 0">
              <PostComponent
                v-for="(publi, index) in feed"
                :post-data="publi"
                :key="index"
                :delete-post="DeletePost"
                :edit-post="EditPost"
              />
            </v-container>
            <NoPostComponent v-else />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ToolbarComponent from "./components/ToolbarComponent.vue";
import FormPostComponent from "./components/FormPostComponent.vue";
import PostComponent from "./components/PostComponent.vue";
import NoPostComponent from "./components/NoPostComponet.vue";

export default {
  name: "App",

  components: {
    ToolbarComponent,
    FormPostComponent,
    PostComponent,
    NoPostComponent,
  },

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
        id: Math.random(),
        texto: dados.texto,
        foto: dados.img,
        datetime: new Date(),
        user: this.user,
      };
      this.feed.push(NovaPublicacao);
    },
    DeletePost(id) {
      this.feed = this.feed.filter((post) => post.id !== id);
    },
    DeleteAllPosts() {
      this.feed = [];
    },
    EditPost(id, novoTexto) {
      const post = this.feed.find((post) => post.id === id);
      post.texto = novoTexto;
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
