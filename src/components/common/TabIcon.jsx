// src/components/common/TabIcon.jsx
import React from 'react';
import TabPng from '../../assets/tab.png';

export default function TabIcon({
  url,
  title = 'Open in new tab',
  size = 24,
  className = '',
}) {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent parent click handlers (like list rows)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <img
      src={TabPng}
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
