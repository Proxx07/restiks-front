import type { UseFetchOptions } from 'nuxt/app';

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  return useFetch(
    url,
    {
      $fetch,
      onResponseError(event) {
        if (event.options.window) {
          alert(event.error.message);
        }
      },
      ...options,
    },
  );
}
