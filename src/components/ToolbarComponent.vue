<template>
  <div>
    <v-toolbar elevation="5" height="80px">
      <div class="manu-wrapper">
        <v-btn @click.stop="drawer = !drawer">
          <v-icon>mdi-menu-open</v-icon>
        </v-btn>
      </div>
      <ButtonDeleteAll :delete-all="deleteAllPosts" />
    </v-toolbar>
    <v-sheet height="100%" width="344" class="overflow-hidden">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="DataUser.fotoPerfil"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ DataUser.nome }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
import ButtonDeleteAll from "./ButtonDeleteAll.vue";

export default {
  components: {
    ButtonDeleteAll,
  },
  props: {
    DataUser: Object,
    deleteAllPosts: Function,
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
};
</script>

<style>
.manu-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
}

.delete-all-button {
  cursor: pointer;
}
</style>
