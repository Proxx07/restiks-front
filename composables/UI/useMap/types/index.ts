import type { LngLat } from '@yandex/ymaps3-types';
import type { IMarker } from '~/composables/useRestaurants/types';

export interface IProps {
  mapTitle?: string
  centerMarker: boolean
  activeMakerId?: string
  markers: IMarker[]
}

export interface IEmits {
  (e: 'mapMoved', value: LngLat): void
  (e: 'markerClick', value: IMarker): void
}
