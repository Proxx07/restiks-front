import { useRegions } from '~/composables/useRegions';

export const useRegionsStore = defineStore('regions', () => {
  const { data, currentRegionId, activeRegion, getRegions, setRegionId, loading } = useRegions();

  const regions = computed(() => data.value || []);

  return {
    regions,
    loading,
    activeRegion,
    currentRegionId,
    getRegions,
    setRegionId,
  };
});
