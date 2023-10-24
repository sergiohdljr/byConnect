<template>
  <v-form class="form">
    <h3 class="text-h4">Registre-se</h3>
    <div>
      <v-text-field type="email" label="E-mail" required />
      <v-text-field type="password" label="Senha" required />
    </div>
    <v-btn type="submit" color="primary text-capitalize text-subtitle-1"
      >Registre-se</v-btn
    >
    <router-link to="/login">Login</router-link>
  </v-form>
</template>
