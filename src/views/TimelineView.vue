<template>
  <div>
    <ScrollButton />
    <FormPostComponent @Post="publicar" />
    <PostComponent
      v-for="(publi, index) in getAllPosts"
      :post-data="publi"
      :allow-actions="publi.user.username === user.username"
      :delete-post="deletePost"
      :edit-post="editPost"
      :key="index"
    />
    <NoPostComponent v-if="getAllPosts.length === 0" />
  </div>
</template>

<script>
import FormPostComponent from "../components/FormPostComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import NoPostComponent from "../components/NoPostComponet.vue";
import { auth } from "@/config/firebase";
import { mapGetters } from "vuex";
import ScrollButton from "@/components/ScrollButton.vue";

export default {
  components: {
    FormPostComponent,
    PostComponent,
    NoPostComponent,
    ScrollButton,
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
};
</script>

<style></style>
