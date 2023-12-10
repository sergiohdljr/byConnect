<template>
  <v-container>
    <h2 class="mb-10">Configurações</h2>
    <div>
      <div class="d-flex" style="gap: 0.4rem">
        <v-icon color="primary">mdi-account-circle</v-icon>
        <h3 style="display: flex; justify-content: center; align-items: end">
          Editar Perfil
        </h3>
      </div>
      <p class="mt-2 d-flex flex-row align-center">
        Você pode alterar o seu nome ou o seu avatar.
      </p>
      <v-btn
        rounded
        color="primary"
        class="custom-transform-class text-none mt-1"
        @click="$router.push('/UpdateUser')"
        >Editar Perfil</v-btn
      >
    </div>

    <div class="mt-10">
      <div class="d-flex" style="gap: 0.4rem">
        <v-icon color="primary">mdi-lock-reset</v-icon>
        <h3 style="display: flex; justify-content: center; align-items: end">
          Trocar senha
        </h3>
      </div>
      <p class="mt-2 d-flex flex-row align-center">
        Por questões de segurança ao trocar sua senha você terá que mudar para
        uma mais forte.
      </p>
      <v-btn
        rounded
        color="primary"
        class="custom-transform-class text-none mt-1"
        @click="$router.push('/changepassword')"
        >Trocar senha</v-btn
      >
    </div>

    <div class="mt-10">
      <div class="d-flex" style="gap: 0.4rem">
        <v-icon color="primary">mdi-account-cancel</v-icon>
        <h3 style="display: flex; justify-content: center; align-items: end">
          Deletar conta
        </h3>
      </div>
      <p class="mt-2 d-flex flex-row align-center">
        Ao deletar sua conta você terá todas suas informações excluídas da
        plataforma. Para excluir uma conta ela deve ter um login recente.
      </p>
      <v-btn
        rounded
        class="custom-transform-class text-none mt-1"
        color="red"
        @click="goToDeleteUser"
        >Deletar conta</v-btn
      >
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
