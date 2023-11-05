<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="text-h6">
          <v-icon color="red" class="mr-2">mdi-alert-circle</v-icon>
          Preencha os campos para atualizar seus dados
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col outlined order="12">
              <v-text-field
                v-model="userInfo.displayName"
                label="Nome"
                hide-details="auto"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col outlined order="12">
              <v-file-input
                label="Foto do perfil"
                filled
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn outlined color="red darken-1" text @click="goBackToConfig">
            Cancelar
          </v-btn>

          <v-btn
            outlined
            color="green darken-1"
            text
            :loading="atualizandoLoading"
            @click="editarInformacoesDoUsuario"
          >
            Atualizar Usuário
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
      userInfo: {},
      dialog: true,
      atualizandoLoading: false,
    };
  },
  methods: {
    editarInformacoesDoUsuario() {
      this.atualizandoLoading = true;
      setTimeout(async () => {
        try {
          await this.$store.dispatch("updateUserInfo", this.userInfo);
          this.atualizandoLoading = false;
        } catch (error) {
          console.log(error);
        }
      }, 1500);
    },
    goBackToConfig() {
      this.$router.push("/Configuration");
    },
  },
};
</script>
