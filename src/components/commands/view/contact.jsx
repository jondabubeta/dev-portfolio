import React from 'react';
import contacts from '../../../data/contact.json';

export default function ContactViewer({ filter = {} }) {
  const wantsAll = Object.keys(filter).length === 0;

  const visibleContacts = contacts.filter(
    ({ type }) => wantsAll || filter[type]
  );

  if (visibleContacts.length === 0) {
    return (
      <div className="terminal-line">
        Unknown contact option. Try: --email, --github, or --linkedin
      </div>
    );
  }

  return (
    <>
      {visibleContacts.map(({ type, label, href }) => (
        <div
          key={type}
          className="terminal-line"
          dangerouslySetInnerHTML={{
            __html: `${type.charAt(0).toUpperCase() + type.slice(1)}: <a href="${href}" target="_blank" class="terminal-link">${label}</a>`
          }}
        />
      ))}
    </>
  );
}
