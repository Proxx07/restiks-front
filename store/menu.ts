import { useMenu } from '~/composables/useMenu';
import type { IProduct } from '~/composables/useMenu/types';

export const useMenuStore = defineStore('menu', () => {
  const $route = useRoute();

  const locationStore = useLocationStore();

  const {
    folders, products, loading, menuError,
    getRegionMenu, getRestaurantMenu, getCustomMenu,
  } = useMenu();

  const search = ref<string>('');

  const currentFolderId = computed<string>(() => ($route.query?.folder as string) || folders.value[0]?.id);

  const currentProducts = computed<IProduct[]>(() => {
    if (search.value.length > 2) return products.value.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()));
    if (currentFolderId.value) return products.value.filter(product => product.category?.id === currentFolderId.value);
    return [];
  });

  const getMenu = async () => {
    if (locationStore.isDelivery) {
      if (!locationStore.longLat[0] && !locationStore.longLat[1]) {
        await getRegionMenu();
      }
      else {
        await getCustomMenu();
      }
    }
    else {
      if (locationStore.restaurantId) {
        await getRestaurantMenu();
      }
      else {
        await getRegionMenu();
      }
    }
  };

  return {
    search,
    folders, products, loading, menuError,
    currentProducts, currentFolderId,
    getMenu,
  };
});
