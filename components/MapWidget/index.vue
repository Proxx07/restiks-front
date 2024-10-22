<script setup lang="ts">
import type { IDelivery } from '~/composables/useDelivery/types';
import type { IMarker } from '~/composables/useRestaurants/types';

const props = defineProps<{
  deliveryTypes: IDelivery[]
  restaurants: IMarker[]
}>();

const emit = defineEmits<{
  (e: 'confirm', value: any): void
}>();

const state = ref({
  delivery: 0,
  longLat: [0, 0],
});

const search = ref('');
const suggestedAddresses = ref<IMarker[]>([]);

const list = computed(() => state.value.delivery === 0 ? suggestedAddresses.value : props.restaurants.filter(rest => rest.title.toLowerCase().includes(search.value.toLowerCase())));
</script>

<template>
  <div class="map-widget">
    <div class="left">
      <SelectButton v-model="state.delivery" :options="deliveryTypes" :option-label="opt => $t(opt.name)" option-value="value" fluid :allow-empty="false" />

      <div class="content">
        <ListWithSearch v-model:search="search" :list="list" list-name-key="title" list-sub-key="address" />
      </div>

      <div class="footer">
        <Button label="confirm" fluid />
      </div>
    </div>
    <div class="right">
      <MapComponent />
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
