<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="text-h6">
          <v-icon color="red" class="mr-2">mdi-alert-circle</v-icon>
          Tem certeza que deseja excluir sua conta ?
        </v-card-title>

        <v-card-text>
          {{ nome }}, Tem certeza que deseja excluir sua conta da nossa rede
          social ? Ao deletar sua conta, serão excluídos todos os seus dados
          permanentemente de nosso banco de dados.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn outlined color="green darken-1" text @click="goBackToConfig">
            Cancelar
          </v-btn>

          <v-btn
            outlined
            :loading="deleteLoading"
            color="red darken-1"
            text
            @click="deleteUserAccount"
          >
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
      deleteLoading: false,
      nome: this.$store.state.auth.user.displayName,
    };
  },
  methods: {
    deleteUserAccount() {
      const email = this.$store.state.auth.user.email;
      this.deleteLoading = true;
      setTimeout(() => {
        this.$store.dispatch("deleteUser", email);
        this.deleteLoading = false;
      }, 2000);
    },
    goBackToConfig() {
      this.$router.push("/Configuration");
    },
  },
};
</script>
