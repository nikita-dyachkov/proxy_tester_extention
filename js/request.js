export async function sendRequest(url, method, proxyUrl, headers, body) {
  const options = {
    method: method,
    headers: new Headers(headers)
  };

  if (method === 'POST' && body) {
    options.body = body;
  }

  if (proxyUrl) {
    const proxy = new URL(proxyUrl);
    const auth = proxy.username ? `${proxy.username}:${proxy.password}` : null;

    options.proxy = {
      protocol: proxy.protocol.replace(':', ''),
      host: proxy.hostname,
      port: parseInt(proxy.port),
      auth: auth
    };

    if (auth) {
      options.headers.set('Proxy-Authorization', `Basic ${btoa(auth)}`);
    }
  }

  console.log('Sending request with options:', options);
  try {
    const response = await fetch(url, options);
    console.log('Response received:', response);
    return response;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}