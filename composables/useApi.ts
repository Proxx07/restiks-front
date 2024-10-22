import type { UseFetchOptions } from 'nuxt/app';

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const $toast = useToastStore();
  const headers = useRequestHeaders(['cookie']);

  const opts = { immediate: false, ...options, headers, initialCache: false };

  return useFetch(url,
    {
      $fetch,

      onRequest() {
        console.log(options);
      },

      onResponseError(event) {
        if (import.meta.server) return;

        // console.log(event.response);
      },

      onResponse(event) {
        if (import.meta.server) return;

        // common error handler
        // console.log(event.response);
      },
      ...opts,
    },
  );
}
