import EmailIcon from '../assets/email.png';
import GitHubIcon from '../assets/github.png';
import LinkedInIcon from '../assets/linkedin.png';

const contacts = [
  { icon: EmailIcon, label: 'Email', command: 'view contact' },
  { icon: GitHubIcon, label: 'GitHub', command: 'view contact' },
  { icon: LinkedInIcon, label: 'LinkedIn', command: 'view contact' },
];

export default function Contacts({ onCommand }) {
  return (
    <div className="section-container">
      <h3>Contact</h3>
      <div className="mt-2 flex flex-row gap-6">
        {contacts.map(({ icon, label, command }) => (
          <div
            key={label}
            onClick={() => onCommand(command)}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-400"
          >
            <img src={icon} alt={label} className="icon-sm" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
