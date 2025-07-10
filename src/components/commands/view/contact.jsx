import React from 'react';
import contacts from '../../../data/contact.json';

export default function ContactViewer({ filter = {} }) {
  const hasTrue = Object.values(filter).some((v) => v === 'true');
  const hasFalse = Object.values(filter).some((v) => v === 'false');
  const wantsAll = Object.keys(filter).length === 0 || (!hasTrue && hasFalse);

  const visibleContacts = contacts.filter(({ type }) => {
    const val = filter[type];
    if (val === 'true') return true;
    if (val === 'false') return false;
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
    <div className="terminal-line">
      {visibleContacts.map(({ type, label, href }, index) => (
        <span key={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}:{' '}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link"
          >
            {label}
          </a>
          {index < visibleContacts.length - 1 && <span>&nbsp;&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}
