import type { YMap } from '@yandex/ymaps3-types';
import type { MapEventUpdateHandler } from '@yandex/ymaps3-types/imperative/YMapListener';
import type { YMapClusterer } from '@yandex/ymaps3-types/packages/clusterer';
import type { YandexMapSettings } from 'vue-yandex-maps';
import type { IEmits, IProps } from './types';

export const useMap = (props: IProps, emit: IEmits) => {
  const siteStore = useSiteStore();
  const locationStore = useLocationStore();

  const map = shallowRef<YMap>();
  const cluster = shallowRef<YMapClusterer>();

  const activeMarkerCoords = computed(() => props.markers.find(m => m.id === props?.activeMakerId)?.coordinates);

  const settings = computed<YandexMapSettings>(() => {
    return {
      theme: siteStore.isDark ? 'dark' : 'light',
      location: {
        center: activeMarkerCoords.value ?? locationStore.activeRegionCenterCoords,
        zoom: 15,
      },
    };
  });

  const mapMarkers = computed(() => props.markers.map((marker) => {
    return {
      ...marker,
      iconSrc: siteStore.mapMarker,
      onClick: () => emit('markerClick', marker),
    };
  }));

  const getCenterOfRegion = async () => {
    try {
      const res = await ymaps3.search({ text: `узбекистан ${locationStore.activeRegion?.name.toLowerCase()}` });
      const result = Array.isArray(res) ? res[0] : res;
      if (result.geometry?.coordinates) {
        locationStore.activeRegionCenterCoords = result.geometry.coordinates as [number, number];
      }
    }
    catch (e: any) {
      if (e.message.includes('ymaps3.search') || (e.message.includes('ymaps3') && e.message.includes('not defined'))) {
        await new Promise(resolve => setTimeout(resolve, 500));
        await getCenterOfRegion();
      }
    }
  };

  const updCallback: MapEventUpdateHandler = (event) => {
    if (!props.centerMarker) return;
    emit('mapMoved', event.location.center);
  };

  const updateHandler = useDebounceFn(updCallback, 150);

  onBeforeMount(() => {
    getCenterOfRegion();
  });

  return {
    map, cluster, settings,

    mapMarkers, updateHandler,
  };
};
