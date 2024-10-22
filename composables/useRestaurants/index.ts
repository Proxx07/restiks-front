import type { IMarker, IRestaurant } from './types';
import { setMarkerFromRestaurant } from './models';

export const useRestaurants = () => {
  const restaurantId = useCookie<string>('restaurantId', { default: () => '' });

  const setRestaurantId = (value: string) => {
    restaurantId.value = value;
  };

  const { data: restaurants, status, refresh: getRestaurantsList } = useApi<IRestaurant[]>('/api/restaurants/List', {
    transform: restaurants => restaurants.filter(rest => rest.isActive),
  });

  const loading = computed(() => status.value === 'pending');

  const activeRestic = computed(() => restaurants.value?.find(rest => restaurantId.value === rest.id));

  const restMarkers = computed<IMarker[]>(() => {
    if (!restaurants.value) return [];
    return restaurants.value?.map(rest => setMarkerFromRestaurant(rest));
  });

  return {
    restaurantId,
    loading,
    restMarkers,
    restaurants,
    activeRestic,
    setRestaurantId,
    getRestaurantsList,
  };
};
