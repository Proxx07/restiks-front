import type { LngLat } from '@yandex/ymaps3-types';
import type { DeliveryValues } from '~/composables/useDelivery/types';

export interface CurrentLocationQuery {
  delivery: DeliveryValues
  coords: LngLat
  restId: string
}
