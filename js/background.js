chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'setProxy') {
    const { host, port, auth } = request.value;
    const proxyConfig = {
      mode: 'fixed_servers',
      rules: {
        singleProxy: {
          scheme: 'http',
          host,
          port
        }
      }
    };

    chrome.proxy.settings.set({ value: proxyConfig, scope: 'regular' }, () => {
      console.log('Proxy configured');
      sendResponse({ success: true });
    });
    return true; // Асинхронный ответ
  }
});