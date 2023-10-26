<template>
  <v-form class="form" @submit.prevent="Login">
    <h3 class="text-h4">Login</h3>
    <div>
      <v-text-field type="email" v-model="user.email" label="E-mail" required />
      <v-text-field
        type="password"
        v-model="user.password"
        label="Senha"
        required
      />
    </div>
    <div class="group-btn">
      <v-btn type="submit" color="primary text-none text-subtitle-1"
        >Login</v-btn
      >
      <v-btn type="submit" color="primary text-none text-subtitle-1"
        >Entrar com Google<v-icon class="ml-2">mdi-google</v-icon></v-btn
      >
      <v-btn type="submit" color="primary text-none text-subtitle-1"
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
      user: {},
    };
  },
  methods: {
    Login() {
      this.$store.dispatch("login", this.user);
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
