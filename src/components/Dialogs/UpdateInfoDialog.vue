<template>
  <div>
    <v-alert v-if="alertState" style="z-index: 1000" outlined type="success"
      >Perfil Atualizado com Sucesso!</v-alert
    >
    <v-dialog persistent v-model="dialog" width="600">
      <v-form
        ref="formUpdateUser"
        lazy-validation
        @submit.prevent="editarInformacoesDoUsuario"
      >
        <v-card>
          <v-card-title class="text-h6">
            <v-icon class="mr-2">mdi-account-cog</v-icon>
            {{ textoDialog }}
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col outlined order="12">
                <v-text-field
                  v-model="userInfo.displayName"
                  label="Nome"
                  hide-details="auto"
                  :rules="formRules.nomeRules"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col outlined order="12">
                <v-text-field
                  v-model="userInfo.photoURL"
                  label="Foto"
                  hide-details="auto"
                  :rules="formRules.photoUrlRules"
                />
                <p class="mt-2">
                  OBS: No momento não estamos aceitando upload de imagens, você
                  terá que colar um link válido para uma imagem.
                </p>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              v-if="!showVoltarBtn"
              outlined
              color="red darken-1"
              text
              @click="goBackToConfig"
            >
              Voltar
            </v-btn>

            <v-btn
              outlined
              color="green darken-1"
              text
              type="submit"
              :loading="atualizandoLoading"
            >
              {{ textoBtn }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    toHome: Boolean,
    textoDialog: String,
    textoBtn: String,
  },
  computed: {
    showVoltarBtn() {
      return this.toHome;
    },
  },
  data() {
    return {
      actualUser: this.$store.state.auth.user,
      userInfo: {},
      dialog: true,
      atualizandoLoading: false,
      formRules: {
        nomeRules: [(nome) => !!nome || "Digite um nome válido"],
        photoUrlRules: [(url) => !!url || "Digite uma URL"],
      },
      alertState: false,
    };
  },
  methods: {
    editarInformacoesDoUsuario() {
      this.atualizandoLoading = true;
      if (this.$refs.formUpdateUser.validate()) {
        setTimeout(async () => {
          try {
            await this.$store.dispatch("updateUserInfo", this.userInfo);
            this.atualizandoLoading = false;
            this.alertState = true;
            this.toHome
              ? this.$router.push("/")
              : this.$router.push("/Configuration");
          } catch (error) {
            throw new Error(error);
          }
        }, 1500);
      } else {
        this.atualizandoLoading = false;
      }
    },
    goBackToConfig() {
      this.$router.push("/Configuration");
    },
  },
};
</script>
