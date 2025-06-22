import { Mail, Github, Linkedin } from "lucide-react";

const contacts = [
  {
    icon: <Mail size={16} />,
    label: "jonathandabu86@gmail.com",
    command: "view contact",
  },
  {
    icon: <Github size={16} />,
    label: "jonathandabu",
    command: "view contact",
  },
  {
    icon: <Linkedin size={16} />,
    label: "linkedin.com/in/jonathandabu",
    command: "view contact",
  },
];

export default function Contacts({ onCommand }) {
  return (
    <div className="section-container">
      <h3>Contact</h3>
      <ul className="space-y-2">
        {contacts.map((c) => (
          <li
            key={c.label}
            onClick={() => onCommand(c.command)}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-400"
          >
            {c.icon}
            <span>{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
