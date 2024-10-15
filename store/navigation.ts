import type { IFolder } from '~/composables/useMenu/types';
import type { Navigation } from '~/composables/useNavigation/types';

export const useNavStore = defineStore('navigation', () => {
  const menuStore = useMenuStore();

  const asideTitle = ref<string>('Folders');
  const asideNavigation = computed<Navigation[] | IFolder[]>(() => {
    // if ()
    return menuStore.folders;
  });

  return {
    asideNavigation,
  };
});
