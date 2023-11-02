<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          bottom
          right
          absolute
          fab
          fixed
          v-bind="attrs"
          v-on="on"
          class="mb-12"
          ><v-icon> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card outlined>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-title>
          <span class="text-h5">Faça um Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <FormPostComponent @Post="publicar" />
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import FormPostComponent from "./FormPostComponent.vue";

export default {
  props: {
    user: Object,
  },
  components: {
    FormPostComponent,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    publicar(dados) {
      const novaPublicacao = {
        id: Math.random(),
        texto: dados.texto,
        foto: dados.img,
        datetime: new Date(),
        user: this.user,
      };
      this.$store.dispatch("post", novaPublicacao);
      this.dialog = false;
    },
  },
};
</script>
