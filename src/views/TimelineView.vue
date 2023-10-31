<template>
  <div>
    <FormPostComponent @Post="publicar" :user-profile="user.fotoPerfil" />
    <PostComponent
      v-for="(publi, index) in posts"
      :post-data="publi"
      :allow-actions="publi.user.username === user.username"
      :delete-post="deletePost"
      :edit-post="editPost"
      :key="index"
    />
    <NoPostComponent />
  </div>
</template>

<script>
import FormPostComponent from "../components/FormPostComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import NoPostComponent from "../components/NoPostComponet.vue";
import { auth } from "@/config/firebase";
import { mapGetters } from "vuex";

export default {
  components: {
    FormPostComponent,
    PostComponent,
    NoPostComponent,
  },

  data() {
    return {
      user: {
        nome: auth.currentUser.displayName,
        username: auth.currentUser.email,
        fotoPerfil: auth.currentUser.photoURL,
      },
    };
  },
  methods: {
    publicar(dados) {
      const novaPublicacao = {
        id: Math.random(),
        texto: dados.texto,
        foto: dados.img,
        datetime: new Date(),
        user: this.user,
      };
      this.$store.dispatch("post", novaPublicacao);
    },
    deletePost(id) {
      this.$store.dispatch("delete", id);
    },
    editPost(id, novoTexto) {
      this.$store.dispatch("editar", id, novoTexto);
    },
  },
  computed: {
    ...mapGetters(["getAllPosts"]),
  },
  created() {
    this.posts = this.getAllPosts;
  },
};
</script>

<style></style>
