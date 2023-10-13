<template>
  <v-card class="mx-auto" max-width="600" width="100%" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ userData.nome }}
          <v-icon>{{ privateIcon }}</v-icon>
          <div class="text-overline mb-4">@{{ userData.username }}</div>
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile size="100" color="grey">
        <img :src="userData.fotoPerfil" :alt="`Perfil ${userData.nome}`" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        :disabled="isPrivate"
        @click="handleNavigation(userData.username)"
        >{{ buttonTitle }}
      </v-btn>
    </v-card-actions>
    <div v-if="isOnUserProfile" class="pa-4">
      <h3>Informações do usuário:</h3>
      <v-divider></v-divider>
      <v-chip-group active-class="primary--text" column>
        <v-chip>
          {{ userData.age }}
        </v-chip>
        <v-chip>
          {{ userData.endereco }}
        </v-chip>
        <v-chip>
          {{ userData.email }}
        </v-chip>
        <v-chip>
          {{ userData.numberOfPosts }}
        </v-chip>
        <v-chip> Perfil Público </v-chip>
      </v-chip-group>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    const path = this.$route.path.toLocaleLowerCase();
    const actualPath =
      `/User-profile/${this.userData.username}`.toLocaleLowerCase();
    return {
      path,
      actualPath,
    };
  },
  props: {
    userData: Object,
  },
  methods: {
    handleNavigation(username) {
      if (!this.isOnUserProfile) {
        this.$router.push(`/User-profile/${username}`);
      } else {
        this.$router.push(`/Posts/${username}`);
      }
    },
  },
  computed: {
    isPrivate() {
      return this.userData.privateProfile;
    },
    privateIcon() {
      return this.userData.privateProfile ? "mdi-eye-off" : "mdi-eye";
    },
    isOnUserProfile() {
      return this.path === this.actualPath;
    },
    buttonTitle() {
      return this.isOnUserProfile
        ? "Ver Postagens do usuário"
        : "visualizar perfil de Usuário";
    },
  },
};
</script>
