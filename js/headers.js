export async function getCurrentHeaders() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url) {
    const exampleHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0"
    };
    document.getElementById('headers').value = JSON.stringify(exampleHeaders, null, 2);
  } else {
    alert('Unable to get current headers');
  }
}