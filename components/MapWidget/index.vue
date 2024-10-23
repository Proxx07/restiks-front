<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types';
import type { IDelivery } from '~/composables/useDelivery/types';
import type { IMarker } from '~/composables/useRestaurants/types';
import { yandexSearch } from '~/ustils/yandexMapSearch';

const props = defineProps<{
  deliveryTypes: IDelivery[]
  restaurants: IMarker[]
}>();

const emit = defineEmits<{
  (e: 'confirm', value: any): void
}>();

const delivery = ref(0);
const deliveryCoords = ref<LngLat>();
const activeMarkerId = ref<string>('');

const search = ref('');
const suggestedAddresses = ref<IMarker[]>([]);

const selectedAddressTitle = ref<string>('Убедитесь что метка поставлена правильно!');

const list = computed(() => {
  if (delivery.value === 0) return suggestedAddresses.value;
  return props.restaurants
    .map(rest => ({ ...rest, isActive: rest.id === activeMarkerId.value }))
    .filter(rest => rest.title.toLowerCase().includes(search.value.toLowerCase()));
});

const delId = computed({
  get() {
    return delivery.value;
  },
  set(value) {
    delivery.value = value;
    deliveryCoords.value = undefined;
    activeMarkerId.value = '';
  },
});

const mapMoveHandler = async (value: LngLat) => {
  deliveryCoords.value = value;

  const result = await yandexSearch(value.join());
  selectedAddressTitle.value = result[0]?.title ?? '';
};

const markerClickHandler = (value: IMarker) => {
  activeMarkerId.value = value.id;
  selectedAddressTitle.value = value.title;
};

const searchInputHandler = async (text: string) => {
  if (delivery.value === 200) return;
  const result = await yandexSearch(`узбекистан ${text}`);
  suggestedAddresses.value = result;
  if (!search.value) suggestedAddresses.value = [];
};
</script>

<template>
  <div class="map-widget">
    <div class="left">
      <SelectButton
        v-model="delId"
        :options="deliveryTypes"
        :option-label="opt => $t(opt.name)"
        option-value="value"
        fluid
        :allow-empty="false"
      />
      <div class="content">
        <ListWithSearch
          v-model:search="search"
          :list="list"
          list-name-key="title"
          list-sub-key="address"
          @item-click="markerClickHandler"
          @update:search="searchInputHandler"
        />
      </div>

      <div class="footer">
        <Button label="confirm" fluid />
      </div>
    </div>
    <div class="right">
      <MapComponent
        :map-title="selectedAddressTitle"
        :center-marker="delivery === 0"
        :markers="restaurants"
        :active-maker-id="activeMarkerId"
        @map-moved="mapMoveHandler"
        @marker-click="markerClickHandler"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-widget {
  flex-grow: 1;
  display: flex;
  gap: 2rem;

  > div {
    flex-grow: 1;
    width: calc(50% - 1rem);
    display: flex;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    .content {
      flex-grow: 1;
      flex-shrink: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
