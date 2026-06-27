// src/components/icons/TabIcon.jsx
import TabPng from '../../assets/tab.png';

export default function TabIcon({
  url,
  command,
  onCommand,
  onNavigate,
  title = 'Open in new tab',
  size = 24,
  className = '',
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (command) {
      if (typeof onCommand === 'function') {
        onCommand(command);
      } else {
        window.dispatchEvent(new CustomEvent('terminal:command', { detail: command }));
      }
      return;
    }

    if (!url) return;

    if (onNavigate) {
      onNavigate(url);
      return;
    }

    // Internal app paths should stay in the same tab even without a custom handler.
    if (typeof url === 'string' && url.startsWith('/')) {
      window.location.assign(url);
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
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
