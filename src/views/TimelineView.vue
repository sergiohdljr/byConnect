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
import { auth } from "@/config/firebase";

export default {
  components: {
    FormPostComponent,
    PostComponent,
    NoPostComponent,
  },

  data() {
    const user = {
      nome: auth.currentUser.displayName,
      username: auth.currentUser.email,
      fotoPerfil: auth.currentUser.photoURL,
    };

    const posts = users.reduce((posts, user) => {
      if (user.posts) {
        return posts.concat(user.posts);
      }
      return posts;
    }, []);

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
      this.feed.unshift(NovaPublicacao);
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
