import { useDelivery } from '~/composables/useDelivery';
import { useLocation } from '~/composables/useLocation';
import type { CurrentLocationQuery } from '~/composables/useLocation/types';
import { useRegions } from '~/composables/useRegions';
import { useRestaurants } from '~/composables/useRestaurants';

export const useLocationStore = defineStore('location', () => {
  const {
    isDelivery, deliveryList, activeDelivery,
    activeDeliveryName, setActiveDelivery,
  } = useDelivery();

  const {
    regions, loading: regionLoading, activeRegion,
    currentRegionId, setRegionId, getRegions, activeRegionCenterCoords,
  } = useRegions();

  const {
    loading: restaurantsLoading, restMarkers, restaurants,
    getRestaurantsList, restaurantId, setRestaurantId, activeRestic,
  } = useRestaurants();

  const { longLat, setLongLat } = useLocation();

  const getCurrentStorageData = (): CurrentLocationQuery => {
    return {
      delivery: activeDelivery.value,
      coords: longLat.value,
      restId: restaurantId.value,
    };
  };

  const setStorageData = (value: CurrentLocationQuery) => {
    setActiveDelivery(value.delivery);
    setLongLat(value.coords as [number, number]);
    setRestaurantId(value.restId);
  };

  return {
    isDelivery, deliveryList, activeDelivery, activeDeliveryName, setActiveDelivery,

    regions, regionLoading, activeRegion, currentRegionId, activeRegionCenterCoords, setRegionId, getRegions,

    restaurantId, restaurantsLoading, restMarkers, restaurants, getRestaurantsList, setRestaurantId, activeRestic,

    longLat, setLongLat,

    getCurrentStorageData, setStorageData,
  };
});
