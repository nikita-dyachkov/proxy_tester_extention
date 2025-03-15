# Proxy Tester Chrome Extension

Proxy Tester is a Google Chrome extension that allows you to send HTTP requests (GET, POST) with support for proxies, saving responses, and validating their content. It’s a handy tool for Proxy testing, similar to Postman, but built directly into your browser.

---

## Features

- **Send Requests**: Supports GET and POST requests.
- **Proxies**: Use proxies for requests (with authentication).
- **Headers**: Add and customize request headers.
- **Request Body**: Support for request body in POST (JSON or key-value format).
- **Save Responses**: Save responses as JSON, HTML, or plain text files.
- **Validation**: Validate responses against a string, regex, or CSS selector.
- **Current Tab Integration**: Pull URL and headers from the current tab.

---

## Installation

1. Download or clone the repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable Developer Mode (toggle in the top right corner).
4. Click "Load unpacked" and select the project folder.
5. The extension will appear in the list and be ready to use.

---

## Usage

1. Click the extension icon in the Chrome toolbar.
2. Enter the URL, select the method (GET or POST), and configure a proxy if needed.
3. Add headers and request body (if required).
4. Click "Send Request" to send the request.
5. The response will appear in the text area. You can save it as a file (JSON, HTML, or plain text).
6. Use validation to check the response against a string, regex, or CSS selector.

## Proxy Configuration

Proxies are configured in the `config.json` file. Example:

```json
{
  "proxies": [
    {
      "name": "Luminati",
      "url": "http://brd-customer-*****-zone-webapi_fp_shared:******@brd.superproxy.io:22225"
    },
    {
      "name": "Another Proxy",
      "url": "http://username:password@proxy.example.com:3128"
    }
  ]
}
```
## Author
Nikita Dyachkov