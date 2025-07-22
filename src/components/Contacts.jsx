import EmailIcon from '../assets/email.png';
import GitHubIcon from '../assets/github.png';
import LinkedInIcon from '../assets/linkedin.png';

const contacts = [
  { icon: LinkedInIcon, label: 'LinkedIn', command: 'view contact --linkedin=true' },
  { icon: GitHubIcon, label: 'GitHub', command: 'view contact --github=true' },
  { icon: EmailIcon, label: 'Email', command: 'view contact --email=true' },
];

export default function Contacts({ onCommand }) {
  return (
    <div className="section-container">
      <h3>Contact</h3>
      <div className="contacts-row">
        {contacts.map(({ icon, label, command }) => (
          <div
            key={label}
            onClick={() => onCommand(command)}
            className="contact-item"
          >
            <img src={icon} alt={label} className="icon-sm" />
            <span className="contact-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
