import { useToggle } from '~/composables/UI/useToggle';

export const useModalsStore = defineStore('modals', () => {
  const { show: mapModal, open: openMapModal, close: closeMapModal } = useToggle();

  return {
    mapModal,
    openMapModal,
    closeMapModal,
  };
});
