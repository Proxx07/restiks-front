<script setup lang="ts">
import {
  YandexMap,
  YandexMapClusterer,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapGeolocationControl,
  YandexMapListener,
  YandexMapMarker, YandexMapZoomControl,
} from 'vue-yandex-maps';

import { useMap } from '~/composables/UI/useMap';
import type { IEmits, IProps } from '~/composables/UI/useMap/types';

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const {
  map, settings, cluster, mapMarkers, updateHandler,
} = useMap(props, emits);
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

      <YandexMapClusterer v-if="!centerMarker" v-model="cluster" :grid-size="64" zoom-on-cluster-click>
        <YandexMapMarker
          v-for="marker in mapMarkers"
          :key="marker.id"
          :settings="marker"
          position="top-center left-center"
          style="width: 60px; height: 65px; position: relative; cursor: pointer"
        >
          <img v-if="marker.iconSrc" :src="marker.iconSrc" alt="image">
          <UIMapDefaultIcon v-else />
        </YandexMapMarker>

        <template #cluster="{ length }">
          <div class="cluster">
            {{ length }}
          </div>
        </template>
      </YandexMapClusterer>
      <YandexMapListener
        :settings="{
          onUpdate: (e) => updateHandler(e),
        }"
      />
    </YandexMap>
    <Transition name="fade">
      <div :key="props.mapTitle" class="map-title">
        {{ props.mapTitle }}
      </div>
    </Transition>
    <i v-if="centerMarker" class="pi pi-map-marker center-marker" />
  </div>
</template>

<style scoped lang="scss">
.map {
  position: relative;
}

.y-map-item {
  height: 100%;
}

.map-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  text-align: center;
  pointer-events: none;
  font: var(--font-18-b);
  color: var(--text-color);
}

.cluster {
  width: 4rem;
  height: 4rem;
  background: var(--primary-500);
  color: var(--primary-surface-color);
  display: flex;
  font: var(--font-12-b);
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-round);
  border: .2rem solid var(--secondary-500);
  animation: fade-in 0.35s;
  cursor: pointer;
}

.center-marker {
  font-size: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--primary-500);
  margin-top: -1.2rem;
}
</style>
