<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="red"
        outlined
        class="rounded-pill action-button"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="p-0">mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card class="outlined">
      <v-card-text>
        <v-container>
          <h2>Tem certeza que deseja deletar o seu Post?</h2>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="green darken-1" text @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn outlined color="red darken-1" text @click="deletePost">
          Sim, deletar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    postId: Number,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deletePost() {
      this.$store.dispatch("delete", this.postId);
      this.dialog = false;
    },
  },
};
</script>

<style>
.outlined {
  border: 0.5px #ffff solid !important;
}
.action-button {
  min-width: 40px !important;
  height: 40px !important;
}
</style>
