<script setup lang="ts">
import '@/assets/styles/main.scss';
</script>

<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.app {
  max-width: 100vw;
  overflow-x: hidden;
  background-color: var(--bg-color);
}
</style>
