export function handleCommand(input) {
  const args = input.split(' ');
  const command = args[0];
  const rest = args.slice(1).join(' ');

  switch (command) {
    case 'help':
      return `Available commands:\nhome, about, projects, contact, resume\necho [msg], date, clear`;
    case 'home':
    case 'cd':
      return 'Welcome to the Home directory.';
    case 'about':
    case 'cat':
      return 'Jonathan Dabu is a Software Engineer with expertise in test automation, systems programming, and game development.';
    case 'projects':
    case 'ls':
      return 'Projects:\n- Corporate Depths\n- Game Analytics Dashboard\n- Corgi Clicker';
    case 'contact':
    case 'whoami':
      return 'Email: jonathan@example.com\nGitHub: github.com/jonathandabu';
    case 'resume':
    case 'open':
      return 'Opening resume... [simulate PDF link]';
    case 'echo':
      return rest;
    case 'date':
      return new Date().toString();
    case 'clear':
      window.location.reload();
      return '';
    default:
      return 'Command not recognized. Type "help" to list commands.';
  }
}
