<template>
  <div>
    <h2 v-if="!searchQuery">todos os usuários:</h2>
    <h2 v-else>
      Usuários que correspondem a sua busca por: "{{ searchQuery }}"
    </h2>
    <div class="wrapper-user-cards">
      <UserCard
        v-for="(user, index) in searchFilter"
        :key="index"
        :user-data="user"
      />
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
    const searchQuery = this.$route.query.search;
    return {
      users,
      searchQuery,
    };
  },
  computed: {
    searchFilter() {
      if (!this.searchQuery) {
        return users;
      } else {
        const userFilterBySearchQuery = users.filter((user) =>
          user.username.toLowerCase().startsWith(this.searchQuery.toLowerCase())
        );
        return userFilterBySearchQuery;
      }
    },
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
