export function handleCommand(input) {
  const args = input.trim().split(" ");
  const command = args[0];
  const rest = args.slice(1).join(" ");

  switch (command) {
    case "help":
      return "Available commands:\n- about\n- projects\n- contact\n- clear";
    case "about":
      return "Jonathan is a developer specializing in test automation and games.";
    case "projects":
      return "Projects:\n- Corporate Depths\n- Analytics Dashboard\n- Corgi Clicker";
    case "contact":
      return "Email: jonathan@example.com";
    case "clear":
      return "__CLEAR__";
    default:
      return `Unknown command: ${command}`;
  }
}
