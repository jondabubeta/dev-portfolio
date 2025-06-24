import { Mail, Github, Linkedin } from 'lucide-react';

const contacts = [
  { icon: Mail, label: 'Email', command: 'view contact' },
  { icon: Github, label: 'GitHub', command: 'view contact' },
  { icon: Linkedin, label: 'LinkedIn', command: 'view contact' },
];

export default function Contacts({ onCommand }) {
  return (
    <div className="section-container">
      <h3>Contact</h3>
      <div className="mt-2 flex flex-row justify-between items-center">
        {contacts.map(({ icon: Icon, label, command }) => (
          <div
            key={label}
            onClick={() => onCommand(command)}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-400"
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
