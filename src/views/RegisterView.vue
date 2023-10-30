<template>
  <v-form class="form" ref="form" lazy-validation @submit.prevent="Register">
    <h3 class="text-h4">Registre-se</h3>
    <v-alert v-if="loginError" outlined type="error">
      {{ loginError }}
    </v-alert>
    <div>
      <v-text-field
        type="email"
        v-model="email"
        :rules="formRules.emailRules"
        label="E-mail"
        required
      />
      <v-text-field
        type="password"
        v-model="senha"
        :rules="formRules.passwordRules"
        label="Senha"
        required
      />
    </div>
    <v-btn
      :loading="loading"
      type="submit"
      color="primary text-capitalize text-subtitle-1"
      >Registre</v-btn
    >
    <router-link to="/login">Login</router-link>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      senha: "",
      loading: false,
      errorMessage: null,
      formRules: {
        emailRules: [
          (email) => !!email || "Digite um E-mail",
          (email) => /.+@.+\..+/.test(email) || "Digite um E-mail válido.",
        ],
        passwordRules: [
          (senha) => !!senha || "Digite uma senha",
          (senha) =>
            /^.{6,}$/.test(senha) || "A senha deve ser maior que 6 caracteres.",
        ],
      },
    };
  },
  computed: {
    loginError() {
      return this.errorMessage;
    },
  },
  methods: {
    async Register() {
      if (this.errorMessage) {
        this.errorMessage = null;
      }

      if (this.$refs.form.validate()) {
        this.loading = true;
        setTimeout(async () => {
          try {
            await this.$store.dispatch("register", this.user);
          } catch (error) {
            this.errorMessage = error.message;
          }

          this.loading = false;
        }, 2000);
      }
    },
  },
};
</script>
<style>
.form {
  padding: 2rem;
  border-radius: 0.6rem;
  width: 100%;
  max-width: 750px;
  height: 500px;
  margin-top: 8rem;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
}

.form > h3 {
  margin-bottom: 4rem;
}
</style>
