<template>
  <v-card class="mx-auto" outlined width="100%" style="margin-bottom: 1rem">
    <v-card-title class="d-flex justify-space-between">
      <span class="subtitle-1 light-gray">{{ postData.horario }}</span>
      <span class="subtitle-1 light-gray">{{ postData.data }}</span>
    </v-card-title>
    <v-card-title v-if="postData.texto.length > 0 || postData.texto">
      <span
        v-if="postData.texto.length > 0 || postData.texto"
        style="hyphens: auto"
        class="h-6 font-weight-regular"
        >{{ postData.texto }}
      </span>
    </v-card-title>
    <v-list-item v-if="postData.foto">
      <v-img v-if="postData.foto" width="100%" :src="postData.foto"></v-img>
    </v-list-item>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img class="elevation-6" alt="" :src="profilePic" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="h1">
            <router-link :to="`/User-profile/${postData.user.email}`">
              {{ postData.user.nome }}
            </router-link>
          </v-list-item-title>
          <v-list-item-title class="light-gray">{{
            postData.user.email
          }}</v-list-item-title>
        </v-list-item-content>
        <v-row
          v-if="allowActions"
          style="height: 50px; display: flex; gap: 5px"
          align="center"
          justify="end"
        >
          <EditDialogComponent :postId="postData.id" />
          <DeleteDialog :postId="postData.id" />
        </v-row>
      </v-list-item>
    </v-card-actions>
    <div style="display: flex; flex-direction: column; gap: 0.2rem">
      <p class="mb-0" style="padding: 8px">
        {{ likesNumber }}
      </p>
      <div class="actions" style="padding: 8px; display: flex">
        <v-btn @click="like" icon>
          <v-icon small>mdi-thumb-up-outline</v-icon>
        </v-btn>

        <v-btn @click="openComents" icon depressed>
          <v-icon small>mdi-comment-multiple-outline</v-icon>
        </v-btn>
      </div>
      <div v-if="showCommentarios">
        <CommentsList
          v-if="showCommentarios"
          :lista-comentarios="postData.coments"
        />
        <form style="padding: 8px">
          <v-text-field
            single-line
            label="Escreva um comentario"
            placeholder="Escreva um comentario"
            outlined
            height="50px"
            v-model="textoComentario"
          >
          </v-text-field>
          <v-btn @click="comment" type="submit">comentar</v-btn>
        </form>
      </div>
    </div>
  </v-card>
</template>

<script>
import EditDialogComponent from "./Dialogs/EditDialogComponent";
import DeleteDialog from "./Dialogs/DeleteDialog";
import CommentsList from "./CommentsList.vue";

export default {
  components: { EditDialogComponent, DeleteDialog, CommentsList },
  props: {
    postData: Object,
    allowActions: Boolean,
  },
  data() {
    return {
      textoComentario: "",
      showCommentarios: false,
    };
  },
  methods: {
    like() {
      const payload = {
        id: this.postData.id,
        userId: this.postData.user.email,
      };
      this.$store.dispatch("likePost", payload);
    },
    openComents() {
      this.showCommentarios = !this.showCommentarios;
    },
    comment() {
      const payload = {
        id: this.postData.id,
        textoComentario: this.textoComentario,
        user: this.postData.user,
      };
      this.$store.dispatch("commentPost", payload);
    },
  },
  computed: {
    profilePic() {
      return this.postData.user.fotoPerfil
        ? this.postData.user.fotoPerfil
        : "https://cpsfoundation.org/wp-content/uploads/headshot-white.png";
    },
    likesNumber() {
      return this.postData.likes === 0
        ? "Nenhuma curtida"
        : `${this.postData.likes} curtidas`;
    },
  },
};
</script>

<style>
.light-gray {
  color: gray !important;
}
</style>
