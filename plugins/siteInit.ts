export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    const siteStore = useSiteStore();
    await siteStore.getAppSettings();
  });
});
