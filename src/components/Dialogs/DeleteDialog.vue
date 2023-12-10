<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-height="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" icon dark v-bind="attrs" v-on="on">
        <v-icon class="p-0">mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <h3>Tem certeza que deseja deletar o seu Post?</h3>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          outlined
          rounded
          color="primary"
          text
          class="custom-transform-class text-none mt-1"
          @click="dialog = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          rounded
          class="custom-transform-class text-none mt-1"
          @click="deletePost"
        >
          Sim, deletar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    postId: String,
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
