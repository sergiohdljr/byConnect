<template>
  <v-form class="form" @submit.prevent="Register">
    <h3 class="text-h4">Registre-se</h3>
    <div>
      <v-text-field type="email" v-model="email" label="E-mail" required />
      <v-text-field type="password" v-model="senha" label="Senha" required />
    </div>
    <v-btn type="submit" color="primary text-capitalize text-subtitle-1"
      >Registre</v-btn
    >
    <router-link to="/login">Login</router-link>
  </v-form>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default {
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    Register() {
      createUserWithEmailAndPassword(auth, this.email, this.senha)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
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
