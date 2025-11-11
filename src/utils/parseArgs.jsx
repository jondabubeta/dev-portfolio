// utils/parseArgs.js
export function parseArgs(argString = '', allowed = []) {
  const tokens =
    argString.match(/(?:[^\s"]+|"[^"]*")+/g) || []; // splits by spaces, keeps "quoted parts"
  const filter = {};
  const errors = [];

  const allowedSet = new Set(allowed);

  const stripQuotes = (s = '') =>
    s.replace(/^"(.*)"$|^'(.*)'$/, (_, d1, d2) => d1 || d2 || '');

  for (const token of tokens) {
    // Positional arg (no leading dash)
    if (!token.startsWith('-')) {
      errors.push(`Unexpected value '${token}'. Use named flags like --company="Neustar".`);
      continue;
    }

    // Remove any number of leading dashes and split on first '='
    const withoutDashes = token.replace(/^-+/, '');
    const [rawKey, ...rest] = withoutDashes.split('=');
    const key = rawKey.trim();
    const rawVal = rest.length ? rest.join('=') : undefined; // preserve '=' inside quoted values
    const normalizedFlag = `--${key}`; // for consistent error messages

    if (!key) {
      errors.push(`Invalid flag '${token}'.`);
      continue;
    }

    if (!allowedSet.has(key)) {
  errors.push(`Invalid argument '${normalizedFlag}'. Allowed: ${[...allowedSet].map(a => `'${a}'`).join(', ')}`);
      continue;
    }

    // Value handling: --flag=true|false|<string> or bare --flag => true
    let val;
    if (rawVal === undefined) {
      val = true; // bare boolean
    } else {
      const unquoted = stripQuotes(rawVal.trim());
      if (/^(true|false)$/i.test(unquoted)) {
        val = /^true$/i.test(unquoted);
      } else {
        val = unquoted;
      }
    }

    filter[key] = val;
  }

  return { filter, errors };
}
