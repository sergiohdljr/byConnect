<template>
  <div>
    <FormPostComponent @Post="Publicar" :user-profile="user.fotoPerfil" />
    <PostComponent
      v-for="(publi, index) in feed"
      :post-data="publi"
      :key="index"
      :delete-post="DeletePost"
      :edit-post="EditPost"
    />
    <NoPostComponent v-if="feed.length === 0" />
  </div>
</template>

<script>
import FormPostComponent from "../components/FormPostComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import NoPostComponent from "../components/NoPostComponet.vue";
import { users } from "@/data";

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
    const posts = users.map((user) => user.posts)[0];

    return {
      user,
      feed: [...posts],
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
