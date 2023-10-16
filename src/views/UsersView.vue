<template>
  <div>
    <v-form class="form-search" @submit.prevent="searchUser">
      <v-text-field
        v-model="searchValue"
        label="Busque um usuário"
        required
      ></v-text-field>
      <v-btn type="submit"> Buscar </v-btn>
    </v-form>
    <h2 class="font-weight-light" v-if="!searchQuery">todos os usuários:</h2>
    <h2 class="font-weight-light" v-else>
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
      searchValue: "",
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
    currentPath() {
      return this.$route.path.startsWith("/Users?=search");
    },
  },
  methods: {
    searchUser() {
      this.$router.push(`/Users?search=${this.searchValue}`);
      location.reload();
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

.form-search {
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
