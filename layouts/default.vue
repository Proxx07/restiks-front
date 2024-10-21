<script setup lang="ts">
import { globe, marker } from 'assets/images';
import Dialog from 'primevue/dialog';
import Popover, { type PopoverMethods } from 'primevue/popover';
import { useNavigation } from '~/composables/useNavigation';
import type { ActionTypes } from '~/composables/useNavigation/types';

const { headerPages } = useNavigation();

const siteStore = useSiteStore();
const menuStore = useMenuStore();
const regionStore = useRegionsStore();

const getDataCommonData = async () => {
  await Promise.all([
    menuStore.getRegionMenu(),
    regionStore.getRegions(),
  ]);
};
await getDataCommonData();

const regionPopover = ref<PopoverMethods>();
const togglePopover = (e: Event) => {
  regionPopover.value?.toggle(e);
};

const regionSelectHandler = (id: number) => {
  regionStore.setRegionId(id);
  if (regionPopover.value) regionPopover.value.hide();
  menuStore.getRegionMenu();
};

const sideBarActionHandler = (value: ActionTypes) => {
  console.log(value);
};
</script>

<template>
  <div class="site-inner container">
    <Header :logo="siteStore.logo" :pages="headerPages">
      <template #header-items>
        <site-navigation-item
          title="Доставка или еда навынос"
          button-text="Выберите тип приёма"
          :icon="marker"
        />

        <site-navigation-item
          title="Регион"
          :button-text="regionStore.activeRegion?.name"
          :icon="globe"
          @button-clicked="togglePopover"
        />
      </template>

      <template #header-bottom>
        <input-text v-model="menuStore.search" placeholder="Поиск" fluid />
        <Button label="Cart" />
      </template>
    </Header>

    <main class="main" role="main">
      <SideBar
        :folders="menuStore.folders"
        :current-folder-id="menuStore.currentFolderId"
        :is-sidebar-pages="siteStore.isSidebarPages"
        @action="sideBarActionHandler"
      />
      <div class="content">
        <transition name="blur">
          <h1 :key="siteStore.activePageName" class="main-heading">
            {{ $t(`menu.${siteStore.activePageName}`) }}
          </h1>
        </transition>
        <slot />
      </div>
    </main>

    <footer class="footer">
      <h3> Footer </h3>
      {{ siteStore.copyright }}
    </footer>

    <Popover ref="regionPopover">
      <div class="regions-list">
        <Button v-for="region in regionStore.regions" :key="region.id" text :label="region.name" @click="regionSelectHandler(region.id)" />
      </div>
    </Popover>

    <!--    <Dialog v-model:visible="dialog" modal :draggable="false" header="Map-widget-title"> -->
    <!--      <h3>Map widget</h3> -->
    <!--    </Dialog> -->

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
    h1.main-heading {
      margin-bottom: 1.8rem;
      &.blur-leave-active,
      &.blur-leave-to {
        display: none !important;
      }
    }
  }

  aside {
    min-width: 30rem;
    max-width: 30rem;
    h3 {
      padding: 2rem;
      border-radius: var(--radius-l) var(--radius-l) 0 0;
      background: var(--primary-500);
      color: var(--primary-surface-color);
      display: flex;
      gap: 2rem;
      align-items: center;
    }
  }

  .content {
    flex-grow: 1;
    padding-top: 1.7rem;
  }

  .footer {
    min-height: 20rem;
  }
}

.regions-list {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  min-width: 10rem;
}
</style>
