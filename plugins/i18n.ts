import { useMenuStore } from '~/store/menu';

export default defineNuxtPlugin((nuxtApp) => {
  const menuStore = useMenuStore();
  const ln = useCookie('i18n_redirected');

  nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => {
    ln.value = newLocale;
    menuStore.getRegionMenu();
  });
});
