import type { IFolder, IMenuDetailedResponse, IMenuResponse, IProduct } from './types';
import { useLocationStore } from '~/store/location';

export const useMenu = () => {
  const locationStore = useLocationStore();

  const folders = ref<IFolder[]>([]);
  const products = ref<IProduct[]>([]);

  const regionMenuParams = computed(() => {
    return {
      RegionId: locationStore.currentRegionId,
    };
  });

  const {
    data: regionmenu,
    status: regionMenuStatus,
    refresh: fetchRegionMenu,
  } = useApi<IMenuResponse>('/api/regionmenu', { params: regionMenuParams });

  const getRegionMenu = async () => {
    await fetchRegionMenu();

    if (regionmenu.value) {
      folders.value = regionmenu.value.categories.filter(folder => !folder.parentId);
      products.value = regionmenu.value.products;
    }
  };

  const restMenuParams = computed(() => {
    return {
      RestaurantId: locationStore.restaurantId,
    };
  });

  const {
    data: restaurantmenu,
    status: restaurantMenuStatus,
    refresh: fetchRestaurantMenu,
  } = useApi<IMenuResponse>('/api/restaurantmenu', { params: restMenuParams });

  const getRestaurantMenu = async () => {
    await fetchRestaurantMenu();
    if (restaurantmenu.value) {
      folders.value = restaurantmenu.value.categories.filter(folder => !folder.parentId);
      products.value = restaurantmenu.value.products;
    }
  };

  const customMenuParams = computed(() => {
    return {
      RestaurantId: '',
      RegionId: locationStore.currentRegionId,
      Longitude: locationStore.longLat[0],
      Latitude: locationStore.longLat[1],
      OrderTypeId: locationStore.activeDelivery,
    };
  });

  const {
    data: customMenu,
    status: customMenuStatus,
    refresh: fetchCustomMenu,
  } = useApi<IMenuDetailedResponse>('/api/restaurantmenu', { params: customMenuParams });

  const getCustomMenu = async () => {
    await fetchCustomMenu();
    if (customMenu.value) {
      folders.value = customMenu.value.categories.filter(folder => !folder.parentId);
      products.value = customMenu.value.products;
      // time store bla bla bla
    }
  };

  const loading = computed(() => {
    return import.meta.client && (regionMenuStatus.value === 'pending' || restaurantMenuStatus.value === 'pending' || customMenuStatus.value === 'pending');
  });

  return {
    loading,
    folders,
    products,

    getCustomMenu,
    getRegionMenu,
    getRestaurantMenu,
  };
};
