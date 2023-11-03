<template>
  <v-card width="100%" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ userData.displayName }}
          <v-icon>{{ privateIcon }}</v-icon>
          <div class="text-overline mb-4">{{ userData.email }}</div>
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile size="100" color="grey">
        <img :src="userData.photoURL" :alt="`Perfil ${userData.displayName}`" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        :disabled="isPrivate"
        @click="handleNavigation(userData.email)"
        >{{ buttonTitle }}
      </v-btn>
    </v-card-actions>
    <div v-if="isOnUserProfile" class="pa-4">
      <h3 class="mb-2 text-uppercase font-weight-medium">
        Informações do usuário:
      </h3>
      <v-divider></v-divider>
      <v-container class="pa-0 mt-2">
        <v-row>
          <v-col cols="6">
            <v-list-item class="pa-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-uppercase font-weight-medium"
                  >Data de criação da conta:
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-medium">{{
                  createdAt
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pa-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-uppercase font-weight-medium"
                  >Data do último acesso:
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-medium">{{
                  lastLoginAt
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="6">
            <v-list-item class="pa-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-uppercase font-weight-medium"
                  >Provedor:</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-medium">
                  <v-icon small>{{ providerIcon }}</v-icon>
                  {{
                    userData.providerData[0].providerId
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pa-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-uppercase font-weight-medium"
                  >Tipo de conta:</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-medium">{{
                  userData.isAnonymous ? "Anônima" : "Pública"
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
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
      return this.userData.isAnonymous;
    },
    privateIcon() {
      return this.userData.isAnonymous ? "mdi-eye-off" : "mdi-eye";
    },
    isOnUserProfile() {
      return (
        this.$route.path.toLocaleLowerCase() ===
        `/User-profile/${this.userData.email}`.toLocaleLowerCase()
      );
    },
    buttonTitle() {
      return this.isOnUserProfile
        ? "Ver Postagens do usuário"
        : "visualizar perfil de Usuário";
    },
    providerIcon() {
      if (this.userData.providerData[0].providerId === "github.com") {
        return "mdi-github";
      } else if (this.userData.providerData[0].providerId === "google.com") {
        return "mdi-google";
      }
      return "";
    },
    createdAt() {
      const userCreated = parseInt(this.userData.metadata.createdAt);
      const date = new Date(userCreated);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const formattedDate = date.toLocaleString("pt-BR", options);
      return formattedDate;
    },
    lastLoginAt() {
      const login = parseInt(this.userData.metadata.lastLoginAt);
      const date = new Date(login);
      console.log(date);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const formattedDate = date.toLocaleString("pt-BR", options);
      return formattedDate;
    },
  },
};
</script>
