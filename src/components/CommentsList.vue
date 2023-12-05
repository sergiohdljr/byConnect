<template>
  <v-list three-line>
    <template v-for="item in listaComentarios">
      <v-list-item :key="item.id">
        <v-list-item-avatar>
          <v-img :src="item.user.fotoPerfil"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <router-link :to="`/User-profile/${item.user.email}`">
              {{ item.user.nome }}
            </router-link>
          </v-list-item-title>
          <v-list-item-title>{{ item.user.email }} </v-list-item-title>
          <v-list-item-subtitle
            ><span>{{ item.textoComentario }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-btn
          @click="deletarComentario(item)"
          icon
          :loading="loadingDeletePost"
          v-if="$store.state.auth.user?.email === item.user.email"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      loadingDeletePost: false,
    };
  },
  props: {
    listaComentarios: Array,
    postId: String,
  },
  methods: {
    deletarComentario(comentario) {
      this.$store.dispatch("deleteCommentPost", {
        postId: this.postId,
        id: comentario.comentId,
      });
    },
  },
};
</script>
