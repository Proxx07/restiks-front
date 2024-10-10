import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
  const { apiBaseUrl, apiUser: userName, apiPassword: password } = useRuntimeConfig();
  const path = event.path.replace(/^\/api\//, 'api/');
  const target = joinURL(apiBaseUrl, path);

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
