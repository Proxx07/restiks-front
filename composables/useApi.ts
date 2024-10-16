import type { UseFetchOptions } from 'nuxt/app';

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const $toast = useToastStore();
  const headers = useRequestHeaders(['cookie']);

  const opts = { immediate: false, ...options, headers };

  return useFetch(url,
    {
      $fetch,

      onResponseError(event) {
        if (import.meta.server) return;

        console.log(event.response);
      },

      onResponse(event) {
        if (import.meta.server) return;

        // common error handler
        console.log(event.response);
      },
      ...opts,
    },
  );
}
