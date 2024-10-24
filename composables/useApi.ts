import type { UseFetchOptions } from 'nuxt/app';

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const $toast = useToastStore();
  const headers = useRequestHeaders(['cookie']);

  return useFetch(url,
    {
      $fetch,

      onResponseError(event) {
        if (import.meta.server) return;
        if (event.error) {
          if (typeof event.error.message === 'string') {
            $toast.error(event.error.message);
          }
        }
        else {
          $toast.error('server.error', event.response.statusText);
        }
      },

      onResponse(event) {
        if (import.meta.server) return;
        // common error handler
        if (event.response._data.error) {
          $toast.error(event.response._data.error as string);
        }
      },

      ...options,
      headers,
      watch: false,
      immediate: false,
    },
  );
}
