<template>
  <v-form class="form">
    <h3 class="text-h4">Login</h3>
    <div>
      <v-text-field type="email" label="E-mail" required />
      <v-text-field type="password" label="Senha" required />
    </div>
    <v-btn type="submit" color="primary text-capitalize text-subtitle-1"
      >Login</v-btn
    >
    <router-link to="/register">Registre-se</router-link>
  </v-form>
</template>

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
