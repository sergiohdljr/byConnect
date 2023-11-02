<template>
  <div class="formPost">
    <v-form outlined class="form-width">
      <v-textarea
        v-model="text"
        counter
        label="O que está acontecendo ?"
      ></v-textarea>
      <v-file-input
        label="adicione uma foto"
        accept="image/png, image/jpeg, image/bmp"
        filled
        prepend-icon="mdi-camera"
        v-model="image"
      ></v-file-input>
      <v-btn
        depressed
        color="primary"
        :disabled="checkInput"
        submit
        rounded
        class="custom-transform-class text-none"
        @click="sendPost"
        >Publicar</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      image: null,
    };
  },
  computed: {
    checkInput() {
      const imagem = this.image;
      const texto = this.text;
      return imagem || texto.length > 0 ? false : true;
    },
  },
  methods: {
    sendPost() {
      const leitor = new FileReader();
      const imagem = this.image;
      if (!imagem) {
        this.$emit("Post", { texto: this.text });
        this.text = "";
      } else {
        leitor.readAsDataURL(imagem);
        leitor.onload = () => {
          this.image = leitor.result;
          this.$emit("Post", { texto: this.text, img: this.image });
          this.text = "";
          this.image = null;
        };
      }
    },
  },
};
</script>

<style>
.formPost {
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
}

.form-width {
  padding-left: 0.5rem;
  width: 100%;
}
</style>
