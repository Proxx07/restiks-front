export default defineNuxtPlugin((nuxtApp) => {
  const siteStore = useSiteStore();

  nuxtApp.hook('app:beforeMount', async () => {
    await siteStore.getAppSettings();
  });
});
