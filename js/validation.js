export function validateResponse(responseText, validationType, validationPattern) {
  if (!validationPattern) return true;

  switch (validationType) {
    case 'string':
      return responseText.includes(validationPattern);
    case 'regex':
      try {
        const regex = new RegExp(validationPattern, 'g');
        return regex.test(responseText);
      } catch (error) {
        console.error('Invalid regex:', error);
        return false;
      }
    case 'selector':
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(responseText, 'text/html');
        return !!doc.querySelector(validationPattern);
      } catch (error) {
        console.error('Invalid selector:', error);
        return false;
      }
    default:
      return false;
  }
}