<template>
  <v-row justify="center">
    <UpdateInfoDialog
      :to-home="false"
      :texto-dialog="`Preencha os campos para atualizar seus dados`"
      :texto-btn="`Atualizar Usuário`"
    />
  </v-row>
</template>
<script>
import UpdateInfoDialog from "@/components/Dialogs/UpdateInfoDialog.vue";

export default {
  components: { UpdateInfoDialog },
};
</script>
