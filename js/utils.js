export function saveToFile(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function addKeyValueField(container, type) {
  const row = document.createElement('div');
  row.className = 'key-value-row';
  row.innerHTML = `
    <input type="text" placeholder="Key">
    <input type="text" placeholder="Value">
    <button onclick="this.parentElement.remove()">Remove</button>
  `;
  container.appendChild(row);
}

export function detectResponseFormat(responseText) {
  try {
    JSON.parse(responseText);
    return 'json';
  } catch (e) {
    const isHtml = /<[a-z][\s\S]*>/i.test(responseText);
    return isHtml ? 'html' : 'txt';
  }
}