<template>
  <v-tooltip left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="isOnTimeline"
        bottom
        right
        absolute
        fab
        fixed
        v-bind="attrs"
        v-on="on"
        class="mb-12"
        @click="scrollToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </template>
    <span>Subir</span>
  </v-tooltip>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  computed: {
    isOnTimeline() {
      return this.$route.path === "/";
    },
  },
};
</script>
