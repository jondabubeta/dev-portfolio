export function parseArgs(argString = '') {
  const filter = {};

  argString
    .split('--')
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((flag) => {
      const [key, value] = flag.split('=').map((part) => part.trim());
      if (key && value) {
        filter[key] = value;
      }
    });

  return filter;
}
