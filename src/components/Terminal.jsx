import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import { handleCommand } from '../utils/handleCommand';
import { splashTextAnsiShadow } from './title/splash';
import { welcomeText } from './title/welcome';
import { version } from './title/version';
import '../styles/terminal.css';

const Terminal = forwardRef((props, ref) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const terminalEndRef = useRef(null);
  const [focused, setFocused] = useState(true);
  const inputRef = useRef(null);

  // ✅ expose runCommand to parent using the ref
  useImperativeHandle(ref, () => ({
    runCommand: (command) => {
      const response = handleCommand(command);
      if (response === '__CLEAR__') {
        setLines([]);
      } else {
        setLines((prev) => [...prev, `> ${command}`, response]);
      }
    },
  }));

  useEffect(() => {
    const splashLines = splashTextAnsiShadow.split('\n');
    setLines([...splashLines, '', version, '', welcomeText]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      const response = handleCommand(command);
      if (response === '__CLEAR__') {
        setLines([]);
      } else {
        setLines((prev) => [...prev, `> ${command}`, response]);
      }
      setInput('');
    } else if (e.key.length === 1 || e.key === 'Backspace') {
      if (e.key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else {
        setInput((prev) => prev + e.key);
      }
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-bar">
        <div className="traffic-lights">
          <span className="red"></span>
          <span className="yellow"></span>
          <span className="green"></span>
        </div>
        <div className="terminal-title">JDabu Portfolio — zsh — 162x22</div>
      </div>

      <div
        className="terminal-body"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={`terminal-line ${
              typeof line === 'string' &&
              (line.toLowerCase().startsWith('version') ||
                line.toLowerCase().startsWith('v'))
                ? 'version'
                : ''
            }`}
          >
            {line}
          </div>
        ))}

        <div className="input-line">
          <span className="prompt">&gt;&nbsp;</span>
          <span className="input-text">{input}</span>
          {focused && showCursor && <span className="block-cursor">█</span>}
          <input
            ref={inputRef}
            type="text"
            className="hidden-input"
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
          />
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
});

export default Terminal;
