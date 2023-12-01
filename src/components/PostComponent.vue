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
  },
  data() {
    return {};
  },
  computed: {
    profilePic() {
      return this.postData.user.fotoPerfil
        ? this.postData.user.fotoPerfil
        : "https://cpsfoundation.org/wp-content/uploads/headshot-white.png";
    },
  },
};
</script>

<style>
.light-gray {
  color: gray !important;
}
</style>
