import { useMenu } from '~/composables/useMenu';
import type { IProduct } from '~/composables/useMenu/types';

export const useMenuStore = defineStore('menu', () => {
  const $route = useRoute();

  const { folders, products, loading, getRegionMenu } = useMenu();

  const currentFolderId = computed<string>(() => ($route.query?.folder as string) || folders.value[0]?.id);

  const currentProducts = computed<IProduct[]>(() => {
    if (!currentFolderId.value) return products.value;
    return products.value.filter(product => product.category?.id === currentFolderId.value);
  });

  return {
    folders, products, loading,
    currentProducts, currentFolderId,
    getRegionMenu,
  };
});
