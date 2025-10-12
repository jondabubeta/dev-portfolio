// src/components/common/TerminalIcon.jsx
import React from 'react';
import TerminalPng from '../../assets/terminal.png';

export default function TerminalIcon({
  command,
  onCommand,
  title = 'Open in Terminal',
  size = 24,
  className = '',
}) {
  const handleClick = (e) => {
    e.stopPropagation(); // don't trigger parent row clicks
    if (typeof onCommand === 'function' && command) {
      onCommand(command);
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
