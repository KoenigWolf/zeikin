export const sanitizeString = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const validateInputType = (value: unknown, expectedType: string): boolean => {
  if (expectedType === 'number') {
    return typeof value === 'number' && Number.isFinite(value);
  }
  if (expectedType === 'string') {
    return typeof value === 'string';
  }
  if (expectedType === 'boolean') {
    return typeof value === 'boolean';
  }
  return false;
};

export const preventInjection = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

