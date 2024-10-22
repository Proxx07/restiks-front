import type { DeliveryValues, IDelivery } from './types';
import { deliveries } from './models';

export const useDelivery = () => {
  const activeDelivery = useCookie<DeliveryValues>('delivery', { default: () => 0 });

  const deliveryList = ref<IDelivery[]>(deliveries);

  const isDelivery = computed<boolean>(() => activeDelivery.value === 0);
  const activeDeliveryName = computed<string>(() => isDelivery.value ? 'delivery' : 'self-delivery');

  const setActiveDelivery = (value: DeliveryValues) => {
    activeDelivery.value = value;
  };

  return {
    isDelivery,
    deliveryList,
    activeDelivery,
    activeDeliveryName,
    setActiveDelivery,
  };
};
