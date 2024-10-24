<script setup lang="ts">
import { globe, marker } from 'assets/images';
import Dialog from 'primevue/dialog';
import Popover, { type PopoverMethods } from 'primevue/popover';
import type { SubmitItem } from '~/composables/UI/useMapWidget/types';
import { useNavigation } from '~/composables/useNavigation';
import type { ActionTypes } from '~/composables/useNavigation/types';

const { headerPages } = useNavigation();

const siteStore = useSiteStore();
const menuStore = useMenuStore();
const locationStore = useLocationStore();
const modalsStore = useModalsStore();

const getDataCommonData = async () => {
  await Promise.all([
    menuStore.getMenu(),
    locationStore.getRegions(),
    locationStore.getRestaurantsList(),
  ]);
};
await getDataCommonData();

const regionPopover = ref<PopoverMethods>();
const togglePopover = (e: Event) => {
  regionPopover.value?.toggle(e);
};

const regionSelectHandler = async (id: number) => {
  locationStore.setRegionId(id);
  locationStore.setLongLat([0, 0]);
  locationStore.setRestaurantId('');
  if (regionPopover.value) regionPopover.value.hide();

  await menuStore.getMenu();
};

const sideBarActionHandler = (value: ActionTypes) => {
  console.log(value);
  // logout()
};

const confirmationHandler = async (value: SubmitItem) => {
  const storageData = locationStore.getCurrentStorageData();

  locationStore.setActiveDelivery(value.delivery);
  locationStore.setRestaurantId(value.activeMarkerId);
  locationStore.setLongLat((value.coords as [number, number]) ?? [0, 0]);

  await menuStore.getMenu();

  if (menuStore.menuError) {
    locationStore.setStorageData(storageData);
  }
  else {
    modalsStore.closeMapModal();
  }
};
</script>

<template>
  <div class="site-inner container">
    <Header :logo="siteStore.logo" :pages="headerPages">
      <template #header-items>
        <site-navigation-item
          :title="$t('header.delivery-title')"
          :button-text="$t(locationStore.activeDeliveryName)"
          :icon="marker"
          @button-clicked="modalsStore.openMapModal"
        />

        <site-navigation-item
          :title="$t('header.region-title')"
          :button-text="locationStore.activeRegion?.name"
          :icon="globe"
          @button-clicked="togglePopover"
        />
      </template>

      <template #header-bottom>
        <input-text v-model="menuStore.search" :placeholder="$t('header.search')" fluid />
        <Button :label="$t('header.basket')" />
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
        <Button v-for="region in locationStore.regions" :key="region.id" text :label="region.name" @click="regionSelectHandler(region.id)" />
      </div>
    </Popover>

    <Dialog v-model:visible="modalsStore.mapModal" modal :draggable="false" :header="$t('header.delivery-text')" class="map-dialog">
      <map-widget :loading="menuStore.loading" :delivery-types="locationStore.deliveryList" :restaurants="locationStore.restMarkers" @confirm="confirmationHandler" />
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
