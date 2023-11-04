<template>
  <v-container>
    <h3 class="mb-10">Configurações</h3>
    <p class="mt-10 d-flex flex-row align-center">
      Editar informações de usuário:
    </p>
    <v-row>
      <v-col outlined order="12">
        <v-text-field
          v-model="userInfo.displayName"
          label="Nome"
          hide-details="auto"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col outlined order="12">
        <v-file-input
          label="File input"
          filled
          prepend-icon="mdi-camera"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-btn
      color="primary"
      :loading="editarLoading"
      @click="editarInformacoesDoUsuario"
      >Editar</v-btn
    >
    <v-row class="mt-15 d-flex flex-column">
      <div class="d-flex flex-row align-end">
        <h3 class="d-flex flex-row align-end">Deletar Usuário</h3>
      </div>
      <p>
        Ao deletar sua conta você terá todas suas informações excluídas da
        plataforma.
      </p>
      <v-btn color="red" @click="goToDeleteUser">Deletar conta</v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        displayName: "",
      },
      editarLoading: false,
    };
  },
  methods: {
    editarInformacoesDoUsuario() {
      this.editarLoading = true;
      setTimeout(() => {
        this.$store.dispatch("updateUserInfo", this.userInfo);
        this.editarLoading = false;
      }, 2000);
    },
    goToDeleteUser() {
      this.$router.push("/DeleteUser");
    },
  },
};
</script>
