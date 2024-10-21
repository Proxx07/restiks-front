export default defineNuxtRouteMiddleware((to) => {
  const siteStore = useSiteStore();
  siteStore.activePageName = (to.name as string)?.split('_')[0] ?? '';
  siteStore.isSidebarPages = to.fullPath.includes('profile');
});
