<template>
  <v-card class="mx-auto" outlined width="100%" style="margin-bottom: 1rem">
    <v-card-title>
      <span class="subtitle-1 light-gray">{{ formatarDataAndHour }}</span>
    </v-card-title>
    <v-card-title v-if="postData.texto.length > 0">
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
          <v-img class="elevation-6" alt="" :src="profilePic"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="h1">{{
            postData.user.nome
          }}</v-list-item-title>
          <v-list-item-title class="light-gray"
            >@{{ postData.user.username }}</v-list-item-title
          >
        </v-list-item-content>
        <v-row
          v-if="allowActions"
          style="height: 50px; display: flex; gap: 5px"
          align="center"
          justify="end"
        >
          <EditDialogComponent @editar-post="EditarPost(postData.id)" />
          <DeleteDialog @delete-post="deletePost(postData.id)" />
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import EditDialogComponent from "./Dialogs/EditDialogComponent";
import DeleteDialog from "./Dialogs/DeleteDialog";

export default {
  components: { EditDialogComponent, DeleteDialog },
  props: {
    postData: Object,
    allowActions: Boolean,
    deletePost: Function,
    editPost: Function,
  },
  data() {
    return {};
  },
  computed: {
    formatarDataAndHour() {
      const data = this.postData.datetime;
      const horas = String(data.getHours()).padStart(2, "0");
      const minutos = String(data.getMinutes()).padStart(2, "0");

      return `${horas}:${minutos}`;
    },
    profilePic() {
      return this.postData.user.fotoPerfil
        ? this.postData.user.fotoPerfil
        : "https://cpsfoundation.org/wp-content/uploads/headshot-white.png";
    },
  },
  methods: {
    EditarPost(id, novoTexto) {
      this.editPost(id, novoTexto);
    },
  },
};
</script>

<style>
.light-gray {
  color: gray !important;
}
</style>
