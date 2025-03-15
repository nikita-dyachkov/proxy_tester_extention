import { loadProxies } from './proxy.js';
import { getCurrentHeaders } from './headers.js';
import { sendRequest } from './request.js';
import { validateResponse } from './validation.js';
import { addKeyValueField, saveToFile, detectResponseFormat } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadProxies();

  const methodSelect = document.getElementById('method');
  const enableHeadersCheckbox = document.getElementById('enable-headers');
  const headersSection = document.getElementById('headers-section');
  const headersFormatSelect = document.getElementById('headers-format');
  const headersJson = document.getElementById('headers-json');
  const headersKeyValue = document.getElementById('headers-key-value');
  const headersKeyValueFields = document.getElementById('headers-key-value-fields');
  const bodySection = document.getElementById('body-section');
  const bodyFormatSelect = document.getElementById('body-format');
  const bodyJson = document.getElementById('body-json');
  const bodyKeyValue = document.getElementById('body-key-value');
  const bodyKeyValueFields = document.getElementById('body-key-value-fields');

  methodSelect.addEventListener('change', () => {
    bodySection.classList.toggle('hidden', methodSelect.value !== 'POST');
  });

  enableHeadersCheckbox.addEventListener('change', () => {
    headersSection.classList.toggle('hidden', !enableHeadersCheckbox.checked);
  });

  headersFormatSelect.addEventListener('change', () => {
    const isJson = headersFormatSelect.value === 'json';
    headersJson.classList.toggle('hidden', !isJson);
    headersKeyValue.classList.toggle('hidden', isJson);
  });

  bodyFormatSelect.addEventListener('change', () => {
    const isJson = bodyFormatSelect.value === 'json';
    bodyJson.classList.toggle('hidden', !isJson);
    bodyKeyValue.classList.toggle('hidden', isJson);
  });

  document.getElementById('add-header').addEventListener('click', () => {
    addKeyValueField(headersKeyValueFields, 'header');
  });

  document.getElementById('add-body-field').addEventListener('click', () => {
    addKeyValueField(bodyKeyValueFields, 'body');
  });

  document.getElementById('send').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    const method = methodSelect.value;
    const proxy = document.getElementById('proxy-list').value;
    const headers = getHeaders();
    const body = getBody();
    const validationType = document.getElementById('validation-type').value;
    const validationPattern = document.getElementById('validation-pattern').value;

    if (!url) {
      alert('Please enter a URL');
      return;
    }

    try {
      const response = await sendRequest(url, method, proxy, headers, body);
      const responseText = await response.text();

      document.getElementById('response').value = `Status: ${response.status}\n\n${responseText}`;

      const validationResult = validateResponse(responseText, validationType, validationPattern);
      alert(`Validation: ${validationResult ? 'Passed' : 'Failed'}`);
    } catch (error) {
      console.error('Request failed:', error);
      document.getElementById('response').value = `Error: ${error.message}`;
    }
  });

  document.getElementById('get-current-url').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      document.getElementById('url').value = tab.url;
    } else {
      alert('Unable to get current URL');
    }
  });

  document.getElementById('get-current-headers').addEventListener('click', getCurrentHeaders);

  document.getElementById('save-response').addEventListener('click', () => {
  const responseText = document.getElementById('response').value;

  if (responseText) {
    const content = responseText.split('\n\n').slice(1).join('\n\n');
    const format = detectResponseFormat(content);
    const filename = `response.${format}`;

    saveToFile(content, filename);
  } else {
    alert('No response to save');
  }
});
});

function getHeaders() {
  const format = document.getElementById('headers-format').value;
  if (format === 'json') {
    return JSON.parse(document.getElementById('headers').value || '{}');
  } else {
    const headers = {};
    document.querySelectorAll('#headers-key-value-fields .key-value-row').forEach(row => {
      const key = row.querySelector('input:nth-child(1)').value;
      const value = row.querySelector('input:nth-child(2)').value;
      if (key && value) headers[key] = value;
    });
    return headers;
  }
}

function getBody() {
  const format = document.getElementById('body-format').value;
  if (format === 'json') {
    return document.getElementById('body').value;
  } else {
    const body = {};
    document.querySelectorAll('#body-key-value-fields .key-value-row').forEach(row => {
      const key = row.querySelector('input:nth-child(1)').value;
      const value = row.querySelector('input:nth-child(2)').value;
      if (key && value) body[key] = value;
    });
    return JSON.stringify(body);
  }
}