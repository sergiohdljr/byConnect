<template>
  <div>
    <h2>todos os usuários :</h2>
    <div class="wrapper-user-cards">
      <UserCard v-for="(user, index) in users" :key="index" :user-data="user" />
    </div>
  </div>
</template>
<script>
import UserCard from "../components/UserCard.vue";
import { users } from "../data";

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      users,
    };
  },
};
</script>

<style>
.wrapper-user-cards {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
