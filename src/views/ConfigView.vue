<template>
  <v-container>
    <h3 class="mb-10">Configurações</h3>
    <p class="mt-10">Editar informações de usuário:</p>
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
    <v-btn color="primary" @click="editarInformacoesDoUsuario">Editar</v-btn>
    <v-row class="mt-15 d-flex flex-column">
      <h3>Deletar Usuário</h3>
      <p>
        Ao deletar sua conta você terá todas suas informações excluídas da
        plataforma.
      </p>
      <v-btn color="red" :loading="deleteLoading" @click="deleteContaDoUsuario"
        >Deletar conta</v-btn
      >
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        displayName: "",
        photoURL: "",
      },
      editarLoading: false,
      deleteLoading: false,
    };
  },
  methods: {
    editarInformacoesDoUsuario() {
      console.log(this.userInfo.displayName);
    },
    deleteContaDoUsuario() {
      this.deleteLoading = true;

      setTimeout(() => {
        this.$store.dispatch("deleteUser");
        this.deleteLoading = false;
      }, 2000);
    },
  },
};
</script>
