<template>
  <v-row justify="center">
    <UpdateInfoDialog
      :to-home="true"
      :texto-dialog="`Crie o seu Perfil de usuário`"
      :texto-btn="`Criar Perfil`"
    />
  </v-row>
</template>
<script>
import UpdateInfoDialog from "@/components/Dialogs/UpdateInfoDialog.vue";

export default {
  components: { UpdateInfoDialog },
};
</script>
