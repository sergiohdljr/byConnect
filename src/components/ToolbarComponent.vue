<template>
  <v-toolbar elevation="5" height="80px">
    <div class="avatar-wrapper">
      <v-avatar size="40px">
        <img alt="Avatar" :src="DataUser.fotoPerfil" />
      </v-avatar>
      <p>{{ DataUser.nome }}</p>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    DataUser: Object,
  },
};
</script>

<style>
.avatar-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
}

.avatar-wrapper > p {
  margin-bottom: 0;
}
</style>
