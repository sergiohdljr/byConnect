<template>
  <div>
    <v-alert v-if="alert" style="z-index: 1000" outlined type="success"
      >Senha atualizada com sucesso!</v-alert
    >
    <v-dialog persistent v-model="dialog" width="600">
      <v-form
        ref="formChangePassword"
        lazy-validation
        @submit.prevent="changePassword"
      >
        <v-card>
          <v-card-title class="text-h6">
            <v-icon class="mr-2">mdi-lock-reset</v-icon>
            Trocar senha
          </v-card-title>
          <v-card-subtitle>
            Sua nova senha deve conter: pelo menos uma letra maiuscula, pelo
            menos uma letra minuscula e pelo menos um caractere especial
            (@#$&*,.).
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-bold">
            Obs: Ao trocar a senha você será automaticamento deslogado
          </v-card-subtitle>

          <v-card-text>
            <v-row>
              <v-col outlined order="12">
                <v-text-field
                  v-model="novaSenha"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Defina uma nova senha"
                  hide-details="auto"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="rules.novaSenha"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col outlined order="12">
                <v-text-field
                  v-model="repetirNovaSenha"
                  :append-icon="showRepitedPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Repita sua nova senha"
                  hide-details="auto"
                  @click:append="showRepitedPassword = !showRepitedPassword"
                  :type="showRepitedPassword ? 'text' : 'password'"
                  :rules="rules.checkPassword"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn @click="backToConfig" outlined color="red darken-1" text>
              Voltar
            </v-btn>

            <v-btn
              outlined
              :loading="loading"
              color="green darken-1"
              text
              type="submit"
            >
              Trocar senha
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      alert: false,
      dialog: true,
      novaSenha: "",
      repetirNovaSenha: "",
      showPassword: false,
      showRepitedPassword: false,
      rules: {
        novaSenha: [
          (novaSenha) =>
            novaSenha.length >= 8 ||
            "A senha dever ter no minímo 8 caracteres.",
          (novaSenha) =>
            /[A-Z]/.test(novaSenha) ||
            "A senha dever ter no minímo uma letra maiuscula.",
          (novaSenha) =>
            /[a-z]/.test(novaSenha) ||
            "A senha dever ter no minímo uma letra minuscula.",
          (novaSenha) =>
            /[@#$&*,.]/.test(novaSenha) ||
            "A senha dever ter no minímo um caractere especial (@#$&*,.).",
        ],
        checkPassword: [
          (checkPassword) =>
            checkPassword === this.novaSenha || "As senhas devem ser identicas",
        ],
      },
    };
  },
  methods: {
    async changePassword() {
      this.loading = true;
      if (this.$refs.formChangePassword.validate()) {
        try {
          await this.$store.dispatch("changePassword", this.novaSenha);
          setTimeout(async () => {
            this.alert = true;
            this.loading = false;
            await this.$store.dispatch("logout");
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      }
    },
    backToConfig() {
      this.$router.push("/Configuration");
    },
  },
};
</script>
