<script setup lang="ts">
import { globe, marker } from 'assets/images';
import Dialog from 'primevue/dialog';
import Popover, { type PopoverMethods } from 'primevue/popover';
import { useNavigation } from '~/composables/useNavigation';

const { headerPages } = useNavigation();

const activePageName = ref<string>('Меню');
const siteStore = useSiteStore();
const menuStore = useMenuStore();
await menuStore.getRegionMenu();

const dialog = ref<boolean>(false);
const openModal = () => {
  dialog.value = true;
};

const region = ref<PopoverMethods>();
const toggleRegionPopover = (e: Event) => {
  region.value?.toggle(e);
};

const authModal = ref<boolean>(false);
const openAuth = () => {
  authModal.value = true;
};
</script>

<template>
  <div class="site-inner container">
    <Header :logo="siteStore.logo" :pages="headerPages" @login-button-click="openAuth">
      <template #header-items>
        <site-navigation-item
          title="Доставка или еда навынос"
          button-text="Выберите тип приёма"
          :icon="marker"
          @button-clicked="openModal"
        />

        <site-navigation-item
          title="Регион"
          button-text="RegionName"
          :icon="globe"
          @button-clicked="toggleRegionPopover"
        />
      </template>

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

    <Popover ref="region">
      <div>
        Here <br>
        will be <br>
        regions
      </div>
    </Popover>

    <Dialog v-model:visible="dialog" modal :draggable="false" header="Map-widget-title">
      <h3>Map widget</h3>
    </Dialog>

    <Dialog v-model:visible="authModal" modal :draggable="false" header="Auth">
      <h3>Auth modal</h3>
    </Dialog>
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
