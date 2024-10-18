<script setup lang="ts">
const pages = [
  { name: 'Меню', link: '/' },
  { name: 'О нас', link: '/about' },
  { name: 'Филиалы', link: '/filial' },
  { name: 'Контакты', link: '/contacts' },
];

const activePageName = ref<string>('Меню');
const siteStore = useSiteStore();
const menuStore = useMenuStore();
await menuStore.getRegionMenu();
</script>

<template>
  <div class="site-inner container">
    <Header :logo="siteStore.logo" :pages="pages">
      <template #header-bottom>
        <input-text v-model="menuStore.search" placeholder="Поиск" fluid />
        <Button label="Cart" />
      </template>
    </Header>

    <main class="main" role="main">
      <SideBar :folders="menuStore.folders" :current-folder-id="menuStore.currentFolderId" />
      <div class="content">
        <h1> {{ activePageName }} </h1>

        <slot />
      </div>
    </main>

    <footer class="footer">
      <h3> Footer </h3>
      {{ siteStore.copyright }}
    </footer>
  </div>
</template>

<style lang="scss">
.site-inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
  main {
    flex-grow: 1;
    display: flex;
    gap: 2.4rem;
    margin-top: 4rem;
  }

  aside {
    min-width: 30rem;
    max-width: 30rem;
  }

  .content {
    flex-grow: 1;
  }

  .footer {
    min-height: 50rem;
  }
}
</style>
