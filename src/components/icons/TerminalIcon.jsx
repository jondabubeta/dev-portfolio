// src/components/icons/TerminalIcon.jsx
import TerminalPng from "../../assets/terminal.png";

export default function TerminalIcon({
  command,
  onCommand,
  title = "Open in Terminal",
  size = 22,
  className = "",
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!command) return;

    if (typeof onCommand === "function") {
      onCommand(command);
    } else {
      window.dispatchEvent(
        new CustomEvent("terminal:command", { detail: command })
      );
    }
  };

  return (
    <img
      src={TerminalPng}
      width={size}
      height={size}
      alt={title}
      title={title}
      role="button"
      aria-label={title}
      className={`icon-sm cursor-pointer ${className}`.trim()}
      onClick={handleClick}
    />
  );
}
