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
import { users } from "../data";
import PostComponent from "@/components/PostComponent.vue";

export default {
  components: {
    PostComponent,
  },
  data() {
    const userPosts = users
      .filter((user) => user.username === this.$route.params.username)
      .map((user) => user.posts)[0];

    return {
      posts: userPosts,
    };
  },
};
</script>
