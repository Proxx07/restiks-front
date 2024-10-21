<script setup lang="ts"></script>

<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <Toast />
</template>

<style lang="scss">
.app {
  max-width: 100vw;
  background-color: var(--bg-color);
}
</style>
