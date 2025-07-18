export function filterEntries(entries, { full = false, filter = {} }) {
  const normalize = (str) => str.toLowerCase();

  return entries.filter((entry) => {
    // Respect fullOnly flag
    if (!full && entry.fullOnly) return false;

    // Company filter (for experience)
    if (filter.company && entry.company &&
      !normalize(entry.company).includes(normalize(filter.company))
    ) return false;

    // Title filter (for experience or projects)
    if (filter.title && entry.title &&
      !normalize(entry.title).includes(normalize(filter.title))
    ) return false;

    // Tags filter (for any section that supports tags)
    if (filter.tags && entry.tags) {
      const tags = Array.isArray(filter.tags)
        ? filter.tags
        : filter.tags.split(',');
      const lowerTags = tags.map(normalize);
      const entryTags = entry.tags.map(normalize);
      if (!lowerTags.some((tag) => entryTags.includes(tag))) {
        return false;
      }
    }

    return true;
  });
}
