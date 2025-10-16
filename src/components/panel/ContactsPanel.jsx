import React from "react";
import contacts from "../../data/contacts.json";

export default function ContactsPanel() {
  return (
    <div className="section-container">
      <h3>Contact</h3>
      <div className="scrollable-table">
        <div className="doc-table">
          {contacts.map((c) => (
            <div key={c.type} className="doc-row">
              <div className="doc-label">{c.type.toUpperCase()}</div>
              <div className="doc-icons">
                <a href={c.href} target="_blank" rel="noreferrer">
                  {c.label}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
