<template>
  <div>
    <h2>Noticias</h2>
    <v-container>
      <v-row>
        <v-col
          v-for="noticia in news"
          :key="noticia.id"
          cols="12"
          sm="6"
          md="4"
        >
          <CardNews :noticia="noticia"></CardNews>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import CardNews from "../components/CardNews";

export default {
  components: { CardNews },
  data() {
    return {
      apiKeyNews: "cc572b1f6e66412ca330086b56939f9e",
      news: [],
      loadingNews: false,
      show: false,
    };
  },
  async mounted() {
    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=technology&apiKey=cc572b1f6e66412ca330086b56939f9e`
      );
      this.news = data.articles;
    } catch (error) {
      throw new Error(error);
    }
  },
};
</script>
