export function parseArgs(argString = '', validKeys = []) {
  const filter = {};
  const errors = [];

  argString
    .split('--')
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((flag) => {
      const [keyRaw, valueRaw] = flag.split('=');
      const key = keyRaw?.trim();
      const value = valueRaw?.trim();

      if (!key || value === undefined || value === '') {
        errors.push(`Missing value for '--${key}'`);
        return;
      }

      if (validKeys.length > 0 && !validKeys.includes(key)) {
        errors.push(`Invalid argument '--${key}'`);
        return;
      }

      // Convert boolean-like strings to actual booleans
      const normalizedValue =
        value === 'true' ? true :
        value === 'false' ? false :
        value;

      filter[key] = normalizedValue;
    });

  return { filter, errors };
}
