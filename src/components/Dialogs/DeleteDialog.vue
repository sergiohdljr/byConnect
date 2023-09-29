<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red" class="rounded-xxl" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <h2>Tem certeza que deseja deletar o seu Post?</h2>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false"> Não </v-btn>
        <v-btn color="red darken-1" text @click="deletePost">
          Sim, deletar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deletePost() {
      this.$emit("delete-post");
      this.dialog = false;
    },
  },
};
</script>

<style scoped></style>
