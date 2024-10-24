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
    error: regionMenuError,
    refresh: fetchRegionMenu,
    clear: clearRegionMenu,
  } = useApi<IMenuResponse>('/api/regionmenu', { params: regionMenuParams });

  const restMenuParams = computed(() => {
    return {
      RestaurantId: locationStore.restaurantId,
    };
  });
  const {
    data: restaurantmenu,
    status: restaurantMenuStatus,
    error: restaurantMenuError,
    refresh: fetchRestaurantMenu,
    clear: clearRestaurantMenu,
  } = useApi<IMenuResponse>('/api/restaurantmenu', { params: restMenuParams });

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
    error: customMenuError,
    refresh: fetchCustomMenu,
    clear: clearCustomMenu,
  } = useApi<IMenuDetailedResponse>('/api/menu', { params: customMenuParams });

  const loading = computed(() => {
    return import.meta.client && (regionMenuStatus.value === 'pending' || restaurantMenuStatus.value === 'pending' || customMenuStatus.value === 'pending');
  });

  const getCustomMenu = async () => {
    clearRegionMenu();
    clearRestaurantMenu();
    await fetchCustomMenu();
    if (customMenu.value && !customMenuError.value && !customMenu.value.error && !customMenu.value?.data?.error) {
      folders.value = customMenu.value.categories.filter(folder => !folder.parentId);
      products.value = customMenu.value.products;
      // time store bla bla bla
    }
  };
  const getRestaurantMenu = async () => {
    clearRegionMenu();
    clearCustomMenu();
    await fetchRestaurantMenu();
    if (restaurantmenu.value && !restaurantmenu.value.error && !restaurantmenu.value.data?.error && !restaurantMenuError.value) {
      folders.value = restaurantmenu.value.categories.filter(folder => !folder.parentId);
      products.value = restaurantmenu.value.products;
    }
  };
  const getRegionMenu = async () => {
    clearRestaurantMenu();
    clearCustomMenu();
    await fetchRegionMenu();
    if (regionmenu.value && !regionmenu.value.error && !regionmenu.value.data?.error && !regionMenuError.value) {
      folders.value = regionmenu.value.categories.filter(folder => !folder.parentId);
      products.value = regionmenu.value.products;
    }
  };

  const menuError = computed(() => {
    return regionMenuError.value || regionmenu.value?.error || regionmenu.value?.data?.error
      || restaurantMenuError.value || restaurantmenu.value?.error || restaurantmenu.value?.data?.error
      || customMenuError.value || customMenu.value?.error || customMenu.value?.data?.error;
  });

  return {
    loading,
    folders,
    products,
    menuError,
    getCustomMenu,
    getRegionMenu,
    getRestaurantMenu,

    clearRegionMenu,
    clearCustomMenu,
    clearRestaurantMenu,
  };
};
