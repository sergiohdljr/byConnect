<template>
  <div>
    <h2 class="font-weight-light">
      Todos os posts do usuário @{{ $route.params.username }}:
    </h2>
    <PostComponent
      v-for="(post, index) in posts"
      :key="index"
      :post-data="post"
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
  computed: {
    ...mapGetters(["getAllPosts"]),
  },
  created() {
    this.posts = this.getAllPosts;

    const userPosts = this.getAllPosts.filter(
      (post) => post.user.username === this.$route.params.username
    );

    this.posts = userPosts;
    console.log(userPosts);
  },
};
</script>
