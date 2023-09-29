<template>
  <v-card class="mx-auto" outlined width="100%">
    <v-card-title>
      <span class="subtitle-1">{{ postData.datetime }}</span>
    </v-card-title>

    <v-card-text class="subtitle-1">
      <p>{{ postData.texto }}</p>
    </v-card-text>
    <v-list-item v-if="postData.foto.lenght === 0">
      <v-img
        v-if="postData.foto.lenght === 0"
        width="100%"
        :src="postData.foto"
      ></v-img>
    </v-list-item>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            :src="postData.user.fotoPerfil"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="h1">{{
            postData.user.nome
          }}</v-list-item-title>
          <v-list-item-title>@{{ postData.user.username }}</v-list-item-title>
        </v-list-item-content>
        <v-row align="center" justify="end">
          <EditDialogComponent></EditDialogComponent>
          <DeleteDialog></DeleteDialog>
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
  },
  data() {
    return {};
  },
};
</script>

<style></style>
