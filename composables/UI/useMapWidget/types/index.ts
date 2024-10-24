import type { LngLat } from '@yandex/ymaps3-types';
import type { DeliveryValues, IDelivery } from '~/composables/useDelivery/types';
import type { IMarker } from '~/composables/useRestaurants/types';

export interface IProps {
  loading: boolean
  deliveryTypes: IDelivery[]
  restaurants: IMarker[]
}

export interface SubmitItem {
  delivery: DeliveryValues
  coords: LngLat | undefined
  activeMarkerId: string
}

export interface IEmits {
  (e: 'confirm', value: SubmitItem): void
}
