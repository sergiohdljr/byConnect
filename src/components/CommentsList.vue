<template>
  <v-list three-line>
    <template v-for="item in listaComentarios">
      <v-list-item :key="item.id">
        <v-list-item-avatar>
          <v-img :src="item.user.fotoPerfil"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <router-link :to="`/User-profile/${item.user.email}`">
              {{ item.user.nome }}
            </router-link>
          </v-list-item-title>
          <v-list-item-title>{{ item.user.email }} </v-list-item-title>
          <v-list-item-subtitle
            >{{ item.textoComentario }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    listaComentarios: Array,
  },
};
</script>
