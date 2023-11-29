<template>
  <div>
    <v-form class="form-search" @submit.prevent="searchUser">
      <v-text-field
        v-model="searchValue"
        label="Busque um usuário"
        required
      ></v-text-field>
      <v-btn type="submit" :loading="loadingSearch"> Buscar </v-btn>
      <v-btn type="button" @click="limparBusca"> limpar </v-btn>
    </v-form>
    <h2 class="font-weight-light" v-if="!searchQuery">todos os usuários:</h2>
    <h2 class="font-weight-light" v-else>
      Usuários que correspondem a sua busca por: "{{ searchQuery }}"
    </h2>
    <div class="wrapper-user-cards">
      <UserCard
        v-for="(user, index) in getAllUsers"
        :key="index"
        :user-data="user"
      />
    </div>
  </div>
</template>
<script>
import UserCard from "../components/UserCard.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      users: "",
      usersListClone: "",
      searchQuery: this.$route.query.search,
      searchValue: "",
      loadingSearch: false,
    };
  },
  computed: {
    ...mapGetters(["getAllUsers"]),
    currentPath() {
      return this.$route.path.startsWith("/Users?=search");
    },
  },
  methods: {
    searchUser() {
      this.$store.dispatch("filtrar", this.searchValue);
    },
    limparBusca() {
      this.$store.dispatch("fetchAllUsers");
      this.searchValue = "";
    },
  },
  mounted() {
    this.$store.dispatch("fetchAllUsers");
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
