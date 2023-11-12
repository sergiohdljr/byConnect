<template>
  <v-container>
    <h2 class="mb-10">Configurações</h2>
    <div>
      <div class="d-flex" style="gap: 0.4rem">
        <v-icon>mdi-account-circle</v-icon>
        <h3 style="display: flex; justify-content: center; align-items: end">
          Editar Perfil
        </h3>
      </div>
      <p class="mt-2 d-flex flex-row align-center">
        Você pode alterar o seu nome ou o seu avatar.
      </p>
      <v-btn @click="$router.push('/UpdateUser')">Editar Perfil</v-btn>
    </div>

    <div class="mt-10">
      <div class="d-flex" style="gap: 0.4rem">
        <v-icon>mdi-lock-reset</v-icon>
        <h3 style="display: flex; justify-content: center; align-items: end">
          Trocar senha
        </h3>
      </div>
      <p class="mt-2 d-flex flex-row align-center">
        Editar informações de usuário:
      </p>
      <v-btn @click="$router.push('/UpdateUser')"
        >Editar Informações do usuário</v-btn
      >
    </div>

    <div class="mt-10">
      <div class="d-flex" style="gap: 0.4rem">
        <v-icon>mdi-account-cancel</v-icon>
        <h3 style="display: flex; justify-content: center; align-items: end">
          Deletar conta
        </h3>
      </div>
      <p class="mt-2 d-flex flex-row align-center">
        Ao deletar sua conta você terá todas suas informações excluídas da
        plataforma. Para excluir uma conta ela deve ter um login recente.
      </p>
      <v-btn color="red" @click="goToDeleteUser">Deletar conta</v-btn>
    </div>
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
