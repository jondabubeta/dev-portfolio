export function parseArgs(argString = '', validKeys = []) {
  const filter = {};
  const errors = [];

  argString
    .split('--')
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((flag) => {
      const [key, value] = flag.split('=').map((p) => p.trim());

      if (!key || value === undefined || value === '') {
        errors.push(`Missing value for '--${key}'`);
      } else if (validKeys.length > 0 && !validKeys.includes(key)) {
        errors.push(`Invalid argument '--${key}'`);
      } else {
        filter[key] = value;
      }
    });

  return { filter, errors };
}
