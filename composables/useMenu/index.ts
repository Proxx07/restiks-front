import type { IFolder, IMenuResponse, IProduct } from './types';

export const useMenu = () => {
  const folders = ref<IFolder[]>([]);
  const products = ref<IProduct[]>([]);

  const { data, status, refresh } = useApi<IMenuResponse>('/api/regionmenu', {
    query: { RegionId: 0 },
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
