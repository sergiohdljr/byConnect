<template>
  <div>
    <div v-if="postData.sharedBy">
      <v-icon color="#808080">mdi-share</v-icon>
      <span style="font-size: 13px; opacity: 0.8; color: gray">
        <router-link :to="`/User-profile/${postData.user.email}`">
          {{ postData.sharedBy }} compartilhou
        </router-link>
      </span>
    </div>

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
        <div class="actions" style="padding: 8px; display: flex">
          <div>
            <v-btn @click="like" icon>
              <v-icon :class="liked" small>mdi-thumb-up-outline</v-icon>
            </v-btn>
            <span>{{ likesNumber }}</span>
          </div>

          <div>
            <v-btn @click="openComents" icon depressed>
              <v-icon small>mdi-comment-multiple-outline</v-icon>
            </v-btn>
            <span>{{ postData.coments?.length }}</span>
          </div>
          <div>
            <v-btn icon>
              <v-icon style="font-size: 19px; margin-bottom: 3px"
                >mdi-share-outline</v-icon
              >
            </v-btn>
            <span>2</span>
          </div>
        </div>
        <div v-if="showCommentarios">
          <CommentsList
            v-if="showCommentarios"
            :post-id="postData.id"
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
              @submit.prevent="comment"
            >
            </v-text-field>
            <v-btn
              type="submit"
              color="primary"
              rounded
              class="custom-transform-class text-none mt-1"
              >Comentar</v-btn
            >
          </form>
        </div>
      </div>
    </v-card>
  </div>
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
        userId: this.$store.state.auth.user?.email,
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
        user: {
          nome: this.$store.state.auth.user?.displayName,
          fotoPerfil: this.$store.state.auth?.user.photoURL,
          email: this.$store.state.auth.user?.email,
        },
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
      return this.postData.likes === 0 ? 0 : `${this.postData.likes} `;
    },
    liked() {
      return this.postData.likedBy?.includes(this.$store.state.auth.user?.email)
        ? "primary--text"
        : "";
    },
  },
};
</script>

<style>
.light-gray {
  color: gray !important;
}
</style>
