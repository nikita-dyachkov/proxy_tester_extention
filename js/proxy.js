export async function loadProxies() {
  const response = await fetch(chrome.runtime.getURL('config.json'));
  const config = await response.json();
  const proxyList = document.getElementById('proxy-list');

  config.proxies.forEach(proxy => {
    const option = document.createElement('option');
    option.value = proxy.url;
    option.textContent = proxy.name;
    proxyList.appendChild(option);
  });
}