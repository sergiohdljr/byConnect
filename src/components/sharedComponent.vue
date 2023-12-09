<template>
  <div>
    <v-icon color="#808080">mdi-share</v-icon>
    <span style="font-size: 16px; opacity: 0.8; color: gray">
      <router-link :to="`/User-profile/${sharedBy}`">
        {{ sharedBy }} compartilhou
      </router-link>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    sharedBy: String,
  },
};
</script>
