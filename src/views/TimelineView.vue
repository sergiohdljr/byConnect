<template>
  <div>
    <ScrollButton />
    <FormPostComponent @Post="publicar" />
    <PostComponent
      v-for="(publi, index) in posts"
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
import { v4 as uuidv4 } from "uuid";

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
      posts: [],
    };
  },
  methods: {
    publicar(dados) {
      const novaPublicacao = {
        id: uuidv4(),
        texto: dados.texto,
        foto: dados.img,
        datetime: new Date(),
        user: this.user,
      };

      if (!novaPublicacao.foto) {
        novaPublicacao.foto = "";
        this.$store.dispatch("post", novaPublicacao);
      }
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
  async mounted() {
    const data = await this.getAllPosts;
    this.posts = data;
    console.log(data);
  },
};
</script>

<style></style>
