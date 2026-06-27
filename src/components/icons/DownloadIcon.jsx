// src/components/icons/DownloadIcon.jsx
import DownloadPng from '../../assets/download.png';

export default function DownloadIcon({
  url,
  filename,
  command,
  onCommand,
  title = 'Download',
  size = 24,
  className = '',
}) {
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
