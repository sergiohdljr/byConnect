<template>
  <v-form class="form" ref="form" lazy-validation @submit.prevent="login">
    <picture
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <img src="../../public/logo.png" width="200" height="200" />
    </picture>
    <h3 class="text-h4">Login</h3>
    <v-alert v-if="loginError" outlined type="error">
      {{ loginError }}
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
    </div>
    <div class="group-btn">
      <v-btn
        :loading="loading.emailSenha"
        color="primary text-none text-subtitle-1"
        type="submit"
        >Login</v-btn
      >
      <v-btn
        :loading="loading.google"
        color="primary text-none text-subtitle-1"
        @click="signGoogle"
        >Entrar com Google<v-icon class="ml-2">mdi-google</v-icon></v-btn
      >
      <v-btn
        :loading="loading.github"
        color="primary text-none text-subtitle-1"
        @click="signGithub"
        >Entrar com Github<v-icon class="ml-2">mdi-github</v-icon></v-btn
      >
    </div>

    <router-link to="/register">Registre-se</router-link>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
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
      user: {},
      loading: {
        emailSenha: false,
        google: false,
        github: false,
      },
      errorMessage: null,
    };
  },
  computed: {
    loginError() {
      return (
        this.errorMessage === "auth/invalid-login-credentials" &&
        "Email ou Senha incorrentos. Tente Novamente."
      );
    },
  },
  methods: {
    async login() {
      if (this.errorMessage) {
        this.errorMessage = null;
      }

      if (this.$refs.form.validate()) {
        this.loading.emailSenha = true;
        setTimeout(async () => {
          try {
            await this.$store.dispatch("login", this.user);
          } catch (error) {
            this.errorMessage = error.message;
          }

          this.loading.emailSenha = false;
        }, 2000);
      }
    },
    signGoogle() {
      this.loading.google = true;
      setTimeout(() => {
        try {
          this.$store.dispatch("googleSignIn");
        } catch (error) {
          this.errorMessage = error.message;
        }
        this.loading.google = false;
      }, 2000);
    },
    signGithub() {
      this.loading.github = true;
      setTimeout(() => {
        try {
          this.$store.dispatch("githubSignIn");
        } catch (error) {
          this.errorMessage = error.message;
        }

        this.loading.github = false;
      }, 2000);
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

.group-btn {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.btn-credential {
  display: flex !important;
  gap: 0.3rem !important;
}
</style>
