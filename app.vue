<script setup lang="ts">
import '@/assets/styles/main.scss';
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
body {
  min-height: 100vh;

  /*
  @include media-min($small) {
    background: var(--black);
  }

  @include media-max($tablet) {
    background: #ccc;
  }
  */
}
</style>
