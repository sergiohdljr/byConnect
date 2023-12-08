import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#F19F05",
      },
      light: {
        primary: "#F19F05",
      },
    },
  },
});
