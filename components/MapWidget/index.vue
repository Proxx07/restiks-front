<script setup lang="ts">
import { useMapWidget } from '~/composables/UI/useMapWidget';
import type { IEmits, IProps } from '~/composables/UI/useMapWidget/types';

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const {
  delId, search, list, isLoading, selectedAddressTitle, activeMarkerId,
  markerClickHandler, searchInputHandler, mapMoveHandler, submitHandler,
} = useMapWidget(props, emit);
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
        <Button
          fluid
          :label="isLoading ? $t('wait') : $t('confirm')"
          :loading="isLoading"
          loading-icon="pi pi-spin pi-spinner"
          @click="submitHandler"
        />
      </div>
    </div>
    <div class="right">
      <MapComponent
        :map-title="selectedAddressTitle"
        :center-marker="delId === 0"
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
