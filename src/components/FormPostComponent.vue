<template>
  <div class="formPost">
    <v-form outlined class="form-width">
      <v-textarea
        v-model="text"
        counter
        label="O que está acontecendo ?"
      ></v-textarea>
      <v-file-input
        :loading="ImageReady"
        label="adicione uma foto"
        filled
        prepend-icon="mdi-camera"
        @change="getImageUrl"
        v-model="image"
      ></v-file-input>
      <div v-if="ImageReady" style="display: flex">
        <p class="ma-0">carregando imagem...</p>
      </div>
      <v-btn
        depressed
        color="primary"
        :disabled="checkInput"
        submit
        rounded
        :loading="postLoading"
        class="custom-transform-class text-none mt-1"
        @click="sendPost"
        >Publicar</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default {
  data() {
    return {
      text: "",
      image: null,
      imageURL: null,
      ImageReady: false,
      postLoading: false,
    };
  },
  computed: {
    checkInput() {
      const imagem = this.imageURL;
      const texto = this.text;
      return imagem || texto.length > 0 ? false : true;
    },
  },
  methods: {
    async sendPost() {
      this.postLoading = true;
      const imagem = this.image;
      if (!imagem) {
        this.$emit("Post", { texto: this.text });
        this.text = "";
      } else {
        this.$emit("Post", { texto: this.text, img: this.imageURL });
        this.text = "";
        this.imageURL = null;
        this.image = null;
      }
      setTimeout(() => {
        this.postLoading = false;
      }, 1500);
    },
    async getImageUrl(file) {
      if (file) {
        this.ImageReady = true;
        const storageRef = ref(storage, "postsFiles/" + file.name);
        try {
          await uploadBytes(storageRef, file);
        } catch (error) {
          console.log(error);
        }
        await getDownloadURL(storageRef).then((url) => {
          this.imageURL = url;
        });
        this.ImageReady = false;
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
