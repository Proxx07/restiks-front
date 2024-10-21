import type { IFolder, IMenuResponse, IProduct } from './types';
import { useRegionsStore } from '~/store/regions';

export const useMenu = () => {
  const regionStore = useRegionsStore();

  const folders = ref<IFolder[]>([]);
  const products = ref<IProduct[]>([]);

  const { data, status, refresh } = useApi<IMenuResponse>('/api/regionmenu', {
    query: { RegionId: regionStore.currentRegionId },
  });

  const getRegionMenu = async () => {
    await refresh();

    if (data.value) {
      folders.value = data.value.categories.filter(folder => !folder.parentId);
      products.value = data.value.products;
    }
  };

  const loading = computed(() => import.meta.client && status.value === 'pending');

  return {
    loading,
    folders,
    products,

    getRegionMenu,
  };
};
