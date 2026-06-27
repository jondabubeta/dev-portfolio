import contacts from '../../../data/contacts.json';

export default function ContactViewer({ filter = {} }) {
  const hasTrue = Object.values(filter).some((v) => v === true || v === 'true');
  const hasFalse = Object.values(filter).some((v) => v === false || v === 'false');
  const wantsAll = Object.keys(filter).length === 0 || (!hasTrue && !hasFalse);
  const lowerFilter = Object.fromEntries(
    Object.entries(filter).map(([k, v]) => [k.toLowerCase(), v])
  );
  const visibleContacts = contacts.filter(({ type }) => {
    const val = lowerFilter[type.toLowerCase()];
    if (val === true || val === 'true') return true;
    if (val === false || val === 'false') return false;
    return wantsAll;
  });

  if (visibleContacts.length === 0) {
    return (
      <div className="terminal-line">
        No contact info matched the filters.
      </div>
    );
  }

  return (
    <div>
      {visibleContacts.map(({ type, href }) => {
        let value = href;
        let display = value;
        let isLink = false;
        if (href.startsWith('mailto:')) {
          value = href.replace('mailto:', '');
          display = value;
        } else if (type.toLowerCase() === 'github' || type.toLowerCase() === 'linkedin') {
          isLink = true;
        }
        const label = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        return (
          <div key={type} className="terminal-line">
            {label}: {isLink ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="terminal-link">{value}</a>
            ) : (
              display
            )}
          </div>
        );
      })}
    </div>
  );
}
