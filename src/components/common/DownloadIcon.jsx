// src/components/common/DownloadIcon.jsx
import React from 'react';
import DownloadPng from '../../assets/download.png';

export default function DownloadIcon({
  url,                 // e.g., '/files/JonathanDabu_Resume.pdf'
  filename,            // optional: suggested filename for the download
  command,             // e.g., 'view resume --download'
  onCommand,           // function to execute command mode
  title = 'Download',
  size = 24,
  className = '',
}) {
  // Command mode (fallback) if no URL is provided
  if (!url) {
    const handleClick = (e) => {
      e.stopPropagation();
      if (typeof onCommand === 'function' && command) {
        onCommand(command);
      }
    };

    return (
      <img
        src={DownloadPng}
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

  // Direct download mode (preferred)
  return (
    <a
      href={url}
      download={filename || true}
      title={title}
      onClick={(e) => e.stopPropagation()}
      aria-label={title}
      className="inline-block align-middle"
    >
      <img
        src={DownloadPng}
        width={size}
        height={size}
        alt={title}
        className={`icon-sm cursor-pointer ${className}`.trim()}
      />
    </a>
  );
}
