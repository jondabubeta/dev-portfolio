// src/components/common/TerminalIcon.jsx
import React from "react";
import TerminalPng from "../../assets/terminal.png";

export default function TerminalIcon({
  command,
  onCommand,
  title = "Open in Terminal",
  size = 22,           // a touch smaller looks great in the panel
  className = "",
}) {
  const handleClick = (e) => {
    e.stopPropagation(); // don't trigger parent row clicks
    if (!command) return;

    if (typeof onCommand === "function") {
      onCommand(command);  // primary path
    } else {
      // fallback path: global bus (Terminal listens for this)
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
