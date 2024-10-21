import { joinURL } from 'ufo';
import { DEFAULT_LANGUAGE, lang } from '~/ustils/constants';
import type { Languages } from '~/ustils/types/locales';

export default defineEventHandler(async (event) => {
  const { apiBaseUrl, apiUser: userName, apiPassword: password } = useRuntimeConfig();

  const path = event.path.replace(/^\/api\//, 'api/');
  const ln = getCookie(event, 'i18n_redirected') ?? DEFAULT_LANGUAGE;

  const resultPath = path.includes('?') ? `${path}&Language=${lang[ln as Languages]}` : `${path}?Language=${lang[ln as Languages]}`;

  const target = joinURL(apiBaseUrl, resultPath);

  let token = '';

  try {
    const result = await $fetch<{ token: string }>(`${apiBaseUrl}/api/account/token`, { method: 'POST', body: { userName, password } });
    token = result.token;
  }
  catch (err) {
    console.error(err);
  }

  Object.assign(event.node.req.headers, { Authorization: `Bearer ${token}` });
  return proxyRequest(event, target);
});
