<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <div
        role="button"
        class="pa-2 red rounded-circle d-inline-block delete-all-button"
        @click="deleteAll"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="white">mdi-trash-can-outline </v-icon>
      </div>
    </template>
    <span>deletar todos os posts</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    deleteAll: Function,
  },
};
</script>
