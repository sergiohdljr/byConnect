<template>
  <div class="w-h-100">
    <div>
      <p>carregando...</p>
      <v-progress-circular
        size="40"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<style>
.w-h-100 {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.w-h-100 > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
