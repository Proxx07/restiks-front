<script setup lang="ts">
const testStore = useTestStore();
</script>

<template>
  <div class="site-inner container">
    <header class="header">
      <nav>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </nav>
    </header>

    <div class="text" style="color: var(--primary-500);">
      Global count = {{ testStore.count }}
    </div>

    <main class="main" role="main">
      <slot />
    </main>

    <footer class="footer">
      Подвал
    </footer>
  </div>
</template>

<style lang="scss">
.site-inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  nav {
    a {
      color: var(--text-color-75);
    }
  }
  main {
    flex-grow: 1;
  }
}
</style>
