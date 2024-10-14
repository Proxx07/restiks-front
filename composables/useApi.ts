import type { UseFetchOptions } from 'nuxt/app';

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const $toast = useToastStore();

  const opts = { immediate: false, ...options };

  return useFetch(url,
    {
      $fetch,

      onResponseError(event) {
        if (import.meta.server) return;

        // common error handler
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
