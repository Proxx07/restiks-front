import type { UseFetchOptions } from 'nuxt/app';

interface IHooks {
  afterResponse: () => void
  afterError: () => void
}

export function useApi<T>(url: string | (() => string), options: Omit<UseFetchOptions<T>, 'onResponse' | 'onResponseError'> = {}, hooks?: IHooks) {
  const opts = {
    immediate: false,
    ...options,
  };
  return useFetch(url,
    {
      $fetch,
      onResponseError(event) {
        if (import.meta.server) return;
        if (hooks?.afterError) return hooks.afterError();

        // common error handler
        console.log(event.response);
      },
      onResponse(event) {
        if (import.meta.server) return;

        if (hooks?.afterResponse && !event.error && (event.response && !event.response._data.error)) {
          return hooks.afterResponse();
        }

        // common error handler
        console.log(event.response);
      },
      ...opts,
    },
  );
}
