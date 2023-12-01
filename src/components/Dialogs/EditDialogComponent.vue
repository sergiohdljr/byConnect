<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        outlined
        color="primary"
        class="rounded-pill action-button"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="p-0">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card class="outlined">
      <v-card-title>
        <span class="text-h5">Edite o seu Post</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-textarea
            counter
            label="Edite o texto do seu post"
            v-model="texto"
          ></v-textarea>
          <v-file-input
            :loading="ImageReady"
            label="adicione uma foto"
            filled
            prepend-icon="mdi-camera"
            @change="getImageUrl"
            v-model="image"
          ></v-file-input>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn
          color="green darken-1"
          :disabled="texto.length === 0 || !imageURL"
          text
          @click="EditarPost"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default {
  props: {
    postId: String,
  },
  data() {
    return {
      dialog: false,
      texto: "",
      image: null,
      imageURL: null,
      ImageReady: false,
      postLoading: false,
    };
  },
  methods: {
    EditarPost() {
      const payload = {
        id: this.postId,
        texto: this.texto,
        foto: this.imageURL,
      };

      this.$store.dispatch("editar", payload);
      this.dialog = false;
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
.action-button {
  min-width: 40px !important;
  height: 40px !important;
  width: 2px !important;
}
</style>
