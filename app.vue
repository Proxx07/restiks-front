<script setup lang="ts">
import '@/assets/styles/main.scss';

const primary = ref<string>('red');
const secondary = ref<string>('');

useHead({
  style: [
    {
      innerHTML: `:root { --primary-500: ${primary.value} }`,
      tagPriority: 'critical',
    },
  ],
});
</script>

<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
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
