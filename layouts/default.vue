<script setup lang="ts">
const pages = [
  { name: 'Menu', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Filial', link: '/filial' },
  { name: 'Contacts', link: '/contacts' },
];

const activePageName = ref<string>('Menu');
</script>

<template>
  <div class="site-inner container">
    <header class="header">
      <nav>
        <NuxtLink v-for="page in pages" :key="page.link" :to="page.link">
          <Button :label="page.name" text plain @click="activePageName = page.name" />
        </NuxtLink>
      </nav>
    </header>

    <main class="main" role="main">
      <aside class="aside">
        <h3> Folders </h3>
      </aside>

      <div class="content">
        <h1> {{ activePageName }} </h1>

        <slot />
      </div>
    </main>

    <footer class="footer">
      <h3> Footer </h3>
    </footer>
  </div>
</template>

<style lang="scss">
.site-inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex-grow: 1;
    display: flex;
    gap: 2.4rem;
  }

  aside {
    min-width: 30rem;
  }

  .content {
    flex-grow: 1;
  }
}
</style>
