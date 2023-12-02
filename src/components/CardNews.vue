<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="noticia.urlToImage" height="200px"></v-img>

    <v-card-subtitle>
      <a :href="noticia.url" target="_blank">{{ noticia.title }}</a>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text> descrição </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ noticia.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    noticia: Object,
  },
};
</script>
