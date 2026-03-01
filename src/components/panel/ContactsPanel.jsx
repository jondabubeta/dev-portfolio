import React from "react";
import contacts from "../../data/contacts.json";
import TerminalIcon from "../icons/TerminalIcon";

// Import your PNG icons from assets
import MailIcon from "../../assets/email.png";
import GitHubIcon from "../../assets/github.png";
import LinkedInIcon from "../../assets/linkedin.png";

const ICONS = {
  email: MailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

function getIconSrc(type) {
  const key = String(type || "").toLowerCase();
  return ICONS[key];
}

export default function ContactsPanel({ onCommand }) {
  return (
    <div className="section-container contacts-section">
      <h3>Contacts</h3>

      <div className="contacts-grid">
        {contacts.map((c) => {
          const type = c.type.toLowerCase();
          const command = `view contact ${type}`;
          const iconSrc = getIconSrc(c.type);

          return (
            <div key={c.type} className="contact-cell">
              <span className="contact-label">{c.label}:</span>

              {/* Main icon opens actual link */}
              <a
                href={c.href}
                target={type === "email" ? "_self" : "_blank"}
                rel="noreferrer"
                title={c.label}
              >
                <img
                  src={iconSrc}
                  alt={c.type}
                  className="icon-sm"
                />
              </a>

              {/* Terminal icon executes command */}
              <TerminalIcon
                command={command}
                onCommand={onCommand}
                title={`View ${c.type} in terminal`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
