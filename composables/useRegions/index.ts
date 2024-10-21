import type { IRegion } from './types';

export const useRegions = () => {
  const currentRegionId = useCookie<number>('region', { default: () => 0 });

  const { data, status, refresh: getRegions } = useApi<IRegion[]>('/api/regions/List');

  const activeRegion = computed<IRegion | undefined> (() => data.value?.find(el => el.id === currentRegionId.value));

  const loading = computed(() => status.value === 'pending');

  const setRegionId = (value: number) => {
    currentRegionId.value = value;
  };

  return {
    data,
    loading,
    activeRegion,
    currentRegionId,
    setRegionId,
    getRegions,
  };
};
