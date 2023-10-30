<template>
  <div>
    <UserCard :user-data="user" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "@/components/UserCard.vue";

export default {
  components: { UserCard },
  data() {
    return {
      username: "",
      user: "",
    };
  },
  computed: {
    ...mapGetters(["getAllUsers"]),
  },
  created() {
    this.username = this.$route.params.username;
    const userData = this.getAllUsers.filter(
      (user) => user.username.toLowerCase() === this.username.toLowerCase()
    )[0];
    this.user = userData;
  },
};
</script>
