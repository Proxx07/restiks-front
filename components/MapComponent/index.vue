<script setup lang="ts">
import type { YMap } from '@yandex/ymaps3-types';

import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapGeolocationControl,
  YandexMapListener,
  YandexMapZoomControl,
} from 'vue-yandex-maps';

/* const props = defineProps<{

}>();

const emit = defineEmits<{

}>(); */

const map = shallowRef<YMap>();

const settings = computed(() => {
  return {
    location: {
      center: [69.279790, 41.311184],
      zoom: 12,
    },
  };
});

const addressTitle = ref<string>('');
</script>

<template>
  <div class="map">
    <YandexMap v-model="map" :settings="settings" width="100%" real-settings-location class="y-map-item">
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />

      <YandexMapControls :settings="{ position: 'left' }">
        <YandexMapZoomControl />
      </YandexMapControls>

      <YandexMapControls :settings="{ position: 'right bottom' }">
        <YandexMapGeolocationControl />
      </YandexMapControls>

      <!--      <YandexMapMarker -->
      <!--        v-for="marker in markers" -->
      <!--        :key="marker.id" -->
      <!--        :settings="marker" -->
      <!--        position="top-center left-center" -->
      <!--        style="width: 60px; height: 65px; position: relative;" -->
      <!--      /> -->

      <YandexMapListener
        :settings="{
          onUpdate: (e) => { console.log(e) },
        }"
      />
    </YandexMap>
  </div>
</template>

<style scoped lang="scss">
.popup-marker {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 20rem;
  &:deep(.p-card-content) {
    display: flex;
    flex-direction: column;
    gap: .7rem;
  }
}

.y-map-item {
  height: 100%;
}
</style>
