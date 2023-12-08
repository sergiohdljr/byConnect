<template>
  <div>
    <LoadingComponentVue v-if="user === ''" />
    <UserCard v-else :user-data="user" />
    <PostDialog />
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import PostDialog from "@/components/PostDialog.vue";
import LoadingComponentVue from "@/components/LoadingComponent.vue";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  components: { UserCard, PostDialog, LoadingComponentVue },
  data() {
    return {
      user: "",
    };
  },
  async created() {
    const userRef = doc(db, "users", this.$route.params.username);
    const userSnap = await getDoc(userRef);
    this.user = userSnap.data();

    document.title = `byConnect - ${this.user.displayName}`;
  },
};
</script>
