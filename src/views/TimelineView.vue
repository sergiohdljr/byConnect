<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="11" md="8" lg="6">
          <FormPostComponent @Post="Publicar" :user-profile="user.fotoPerfil" />
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
  </div>
</template>

<script>
import FormPostComponent from "../components/FormPostComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import NoPostComponent from "../components/NoPostComponet.vue";

export default {
  components: {
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
    EditPost(id, novoTexto) {
      const post = this.feed.find((post) => post.id === id);
      post.texto = novoTexto;
    },
  },
};
</script>

<style></style>
