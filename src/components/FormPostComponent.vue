<template>
  <div class="formPost">
    <v-avatar size="40px">
      <img alt="Avatar" :src="userProfile" />
    </v-avatar>
    <v-form class="form-width">
      <v-textarea v-model="text" counter label="What's Up?"></v-textarea>
      <v-btn
        depressed
        color="primary"
        :disabled="checkInput"
        submit
        rounded
        @click="sendPost"
        >Publicar</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    userProfile: String,
  },
  data() {
    return {
      text: "",
    };
  },
  computed: {
    checkInput() {
      return this.text.length === 0 ? true : false;
    },
  },
  methods: {
    sendPost() {
      if (this.text.length === 0) {
        return;
      } else {
        this.$emit("Post", this.text);
        this.text = "";
      }
    },
  },
};
</script>

<style>
.formPost {
  width: 100%;
  display: flex;
}

.form-width {
  padding-left: 0.5rem;
  width: 100%;
}
</style>
