import { useApi } from '#imports';

export const useMenu = async () => {
  const folders = ref<any[]>([]);
  const products = ref<any[]>([]);

  const productsForCart = ref<any[]>([]);

  const { data, error, status, refresh: getRegionMenu } = useApi<Record<string, any[]>>('/api/regionmenu',
    {
      query: {
        RegionId: 0,
        Language: 2,
      },
    },
    {
      afterResponse: () => {
        if (data.value) {
          folders.value = data.value.categories.filter(folder => !folder.parentId);
          products.value = data.value.categories.filter((folder) => {
            folder.id;
          });
        }
      },
    },
  );

  await getRegionMenu();

  return {
    getRegionMenu,
  };
};
