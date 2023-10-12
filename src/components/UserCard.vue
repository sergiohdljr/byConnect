<template>
  <v-card class="mx-auto" max-width="600" width="100%" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ userData.nome }}
          <v-icon>{{ isPrivate }}</v-icon>
          <div class="text-overline mb-4">@{{ userData.username }}</div>
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile size="100" color="grey">
        <img :src="userData.fotoPerfil" :alt="`Perfil ${userData.nome}`" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text>visualizar perfil de Usuário </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    userData: Object,
  },
  computed: {
    isPrivate() {
      return this.userData.privateProfile === true ? "mdi-eye-off" : "mdi-eye";
    },
  },
};
</script>
