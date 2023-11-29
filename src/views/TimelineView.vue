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
        email: auth.currentUser.email,
        fotoPerfil: auth.currentUser.photoURL,
      },
    };
  },
  methods: {
    publicar(dados) {
      const date = new Date();
      const horario = `${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      const dataFormatada = date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const novaPublicacao = {
        id: uuidv4(),
        texto: dados.texto,
        foto: dados.img,
        horario,
        data: dataFormatada,
        user: this.user,
      };
      if (!novaPublicacao.foto) {
        novaPublicacao.foto = "";
      }
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
  mounted() {
    this.$store.dispatch("fetchPosts");
  },
};
</script>

<style></style>
