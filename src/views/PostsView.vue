<template>
  <div class="container">
    <div class="title">
      <v-icon color="primary">mdi-post</v-icon>
      <h3>Postados:</h3>
    </div>

    <PostComponent
      v-for="post in posts"
      :key="post.id"
      :post-data="post"
      :delete-post="deletePost"
      :edit-post="editPost"
    />
    <div class="title">
      <v-icon color="primary">mdi-share</v-icon>
      <h3>Compartilhados:</h3>
    </div>

    <PostComponent
      v-for="post in shared"
      :key="post.id"
      :post-data="post"
      :delete-post="deletePost"
      :edit-post="editPost"
    />
  </div>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PostComponent,
  },
  data() {
    return {
      posts: [],
      shared: [],
    };
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch("delete", id);
    },
    editPost(id, novoTexto) {
      this.$store.dispatch("editar", id, novoTexto);
    },
  },
  computed: {
    ...mapGetters(["getAllPosts"]),
  },
  created() {
    const userPosts = this.getAllPosts.filter(
      (post) => post.user.email === this.$route.params.username
    );

    const posts = userPosts.filter((post) => !post?.sharedBy);

    const shared = userPosts.filter(
      (post) => post?.sharedBy === this.$route.params.username
    );

    this.posts = posts;
    this.shared = shared;
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
}
</style>
