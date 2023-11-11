<template>
  <v-form class="form" ref="form" lazy-validation @submit.prevent="Register">
    <h3 class="text-h4">Registre-se</h3>
    <v-alert v-if="registerError" outlined type="error">
      {{ registerError }}
    </v-alert>
    <div>
      <v-text-field
        type="email"
        v-model="user.email"
        :rules="formRules.emailRules"
        label="E-mail"
        required
      />
      <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        v-model="user.password"
        :rules="formRules.passwordRules"
        @click:append="showPassword = !showPassword"
        label="Senha"
        required
      />
      <v-text-field
        :append-icon="showRepitedPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showRepitedPassword ? 'text' : 'password'"
        v-model="checkPassword"
        :rules="formRules.secondPasswordRule"
        @click:append="showRepitedPassword = !showRepitedPassword"
        label="Repita a sua senha"
        required
      />
    </div>
    <v-btn
      :loading="loading"
      type="submit"
      color="primary text-none text-subtitle-1"
      >Registre-se</v-btn
    >
    <router-link to="/login">Login</router-link>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      checkPassword: "",
      showPassword: false,
      showRepitedPassword: false,
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
        secondPasswordRule: [
          (secondSenha) =>
            secondSenha === this.user.password ||
            "As senhas devem ser identicas",
        ],
      },
    };
  },
  computed: {
    registerError() {
      if (this.errorMessage === "auth/email-already-in-use") {
        return "E-mail já cadastrado";
      }
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
