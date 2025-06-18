export function handleCommand(input) {
  const args = input.trim().split(' ');
  const command = args[0];

  switch (command) {
    case 'help':
      return 'Available commands:\n- about\n- projects\n- contact\n- clear';
    case 'about':
      return 'Jonathan is a developer specializing in test automation and games.';
    case 'resume':
      return RESUME;
    case 'projects':
      return (
        <details>
          <summary>See Projects</summary>
          <ul>
            <li>Corporate Depths</li>
            <li>Analytics Dashboard</li>
            <li>Corgi Clicker</li>
          </ul>
        </details>
      );
    case 'contact':
      return 'Email: jonathan@example.com';
    case 'clear':
      return '__CLEAR__';
    default:
      return `Unknown command: ${command}`;
  }
}
