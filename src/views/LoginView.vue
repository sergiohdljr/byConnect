<template>
  <v-form class="form" ref="form" lazy-validation @submit.prevent="login">
    <h3 class="text-h4">Login</h3>
    <div>
      <v-text-field
        type="email"
        v-model="user.email"
        :rules="formRules.emailRules"
        label="E-mail"
        required
      />
      <v-text-field
        type="password"
        v-model="user.password"
        :rules="formRules.passwordRules"
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
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loading.emailSenha = true;
        setTimeout(() => {
          this.$store.dispatch("login", this.user);
          this.loading.emailSenha = false;
        }, 2000);
      }
    },
    signGoogle() {
      this.loading.google = true;
      setTimeout(() => {
        this.$store.dispatch("googleSignIn");
        this.loading.google = false;
      }, 2000);
    },
    signGithub() {
      this.loading.github = true;
      setTimeout(() => {
        this.$store.dispatch("githubSignIn");
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
