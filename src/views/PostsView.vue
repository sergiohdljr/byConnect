<template>
  <div>
    <h2 class="font-weight-light">
      Todos os posts do usuário {{ $route.params.username }}:
    </h2>
    <PostComponent
      v-for="(post, index) in posts"
      :key="index"
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
      posts: "",
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
    this.posts = this.getAllPosts;

    const userPosts = this.getAllPosts.filter(
      (post) => post.user.username === this.$route.params.username
    );

    this.posts = userPosts;
  },
};
</script>
