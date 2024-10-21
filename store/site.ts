import type { ISiteSettings } from '~/ustils/types/siteSettings';

export const useSiteStore = defineStore('site', () => {
  const locale = useCookie('i18n_redirected');
  const { data, refresh: getAppSettings } = useFetch<ISiteSettings>('/api/system/');

  const logo = computed(() => data.value?.SiteSettings.Logo ?? '');
  const phoneNumber = computed(() => data.value?.callCanterPhone ?? '');
  const email = computed(() => data.value?.email ?? '');

  const activePageName = ref<string>('');
  const isSidebarPages = ref<boolean>(false);

  const copyright = computed(() => {
    if (locale.value === 'en') return data.value?.legalNameEn;
    if (locale.value === 'uz') return data.value?.legalNameUz;
    return data.value?.legalNameRu;
  });

  const phones = computed(() => {
    if (locale.value === 'en') return data.value?.phonesEn;
    if (locale.value === 'uz') return data.value?.phonesUz;
    return data.value?.phonesRu;
  });

  const socials = computed(() => {
    if (!data.value) return [];
    return data.value?.socials.map((social) => {
      return {
        ...social,
        // icon: socialIcons[social.name],
      };
    });
  });

  return {
    logo,
    email,
    phones,
    socials,
    copyright,

    activePageName,
    isSidebarPages,

    phoneNumber,
    getAppSettings,
  };
});
