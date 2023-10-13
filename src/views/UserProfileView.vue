<template>
  <div>
    <UserCard :user-data="userData" />
  </div>
</template>

<script>
import { users } from "@/data";
import UserCard from "@/components/UserCard.vue";

export default {
  components: {
    UserCard,
  },
  data() {
    const username = this.$route.params.username;
    const userData = users.filter(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    )[0];

    return {
      userData,
    };
  },
};
</script>
