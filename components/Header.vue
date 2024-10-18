<script setup lang="ts">
import { globe, marker } from 'assets/images';
import Dialog from 'primevue/dialog';
import Popover, { type PopoverMethods } from 'primevue/popover';

defineProps<{
  logo: string
  pages: Record<string, string>[]
}>();

const localePath = useLocalePath();

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
  <header class="header">
    <NuxtLink v-if="logo" :to="localePath('/')" class="header__logo">
      <img :src="logo" alt="Logo">
    </NuxtLink>
    <div class="header__content">
      <div class="header__content-top">
        <site-navigation :pages="pages" style="flex-grow: 1" />

        <site-navigation-item title="Доставка или еда навынос" button-text="Выберите тип приёма" :icon="marker" @button-clicked="openModal" />
        <site-navigation-item title="Регион" button-text="RegionName" :icon="globe" @button-clicked="toggleRegionPopover" />

        <div style="display: flex; align-items: center; gap: 1rem; min-width: 19rem">
          <LangSwitcher />
          <Button severity="secondary" label="LoginButton" @click="openAuth" />
        </div>
      </div>

      <div class="header__content-bottom">
        <slot name="header-bottom" />
      </div>
    </div>

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
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  &__logo {
    font-size: 0;
    min-width: 15rem;
    max-width: 15rem;
    img {
      max-width: 100%;
    }
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    &-top {
      display: grid;
      grid-template-columns: 6fr 3fr 1fr 2fr;
      gap: 2rem;
    }

    &-bottom {
      display: grid;
      grid-template-columns: 10fr 2fr;
      gap: 2rem;
    }
  }
}
</style>
