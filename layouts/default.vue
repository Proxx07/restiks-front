<script setup lang="ts">
const testStore = useTestStore();
</script>

<template>
  <header class="header">
    <nav>
      <NuxtLink to="/">
        Home
      </NuxtLink>

      <NuxtLink to="/test">
        Test
      </NuxtLink>
    </nav>
  </header>

  <div class="text">
    Global count = {{ testStore.count }}
  </div>

  <main class="main" role="main">
    <slot />
  </main>

  <footer class="footer" style="min-height: 20rem; background: #000" />
</template>

<style>
.text {
  color: var(--primary-500);
}
</style>
