// src/components/Terminal.jsx
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef
} from 'react';
import { handleCommand } from '../utils/handleCommand';
import { splashText, splashTextMobile } from './title/splash';
import { welcomeText } from './title/welcome';
import { version } from './title/version';

const Terminal = forwardRef((props, ref) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null); // null means editing current input
  const [showCursor, setShowCursor] = useState(true);
  const terminalEndRef = useRef(null);
  const [focused, setFocused] = useState(true);
  const inputRef = useRef(null);

  // Use smaller JDabu splash on mobile
  const splash = (typeof window !== 'undefined' && window.innerWidth < 768)
    ? splashTextMobile
    : splashText;

  // Centralized executor (keyboard, ref, and event bus use this)
  const execute = (command) => {
    const cmd = String(command || '').trim();
    if (!cmd) return;
    // record in history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);
    const response = handleCommand(cmd);
    if (response === '__CLEAR__') {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        `> ${cmd}`,
        typeof response === 'string'
          ? response
          : { __component__: true, element: response }
      ]);
    }
  };

  useImperativeHandle(ref, () => ({
    runCommand: (command) => execute(command)
  }));

  useEffect(() => {
    const splashLines = splash.split('\n');
    setLines([...splashLines, '', version, '', welcomeText]);
  }, []);

  useEffect(() => {
    // Smooth scroll on desktop, but use instant on mobile to prevent over-scroll
    const isMobile = window.innerWidth < 768;
    terminalEndRef.current?.scrollIntoView({ 
      behavior: isMobile ? 'auto' : 'smooth',
      block: 'end'
    });
  }, [lines]);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  // NEW: listen for global terminal commands (from icons, etc.)
  useEffect(() => {
    const onBus = (e) => execute(e.detail);
    window.addEventListener('terminal:command', onBus);
    return () => window.removeEventListener('terminal:command', onBus);
  }, []);

  const handleKeyDown = (e) => {
    // history navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      if (e.key === 'ArrowUp') {
        // move back in history
        if (historyIndex === null) {
          setHistoryIndex(history.length - 1);
          setInput(history[history.length - 1]);
        } else if (historyIndex > 0) {
          setHistoryIndex((i) => {
            const ni = i - 1;
            setInput(history[ni]);
            return ni;
          });
        }
      } else {
        // ArrowDown: move forward
        if (historyIndex === null) return;
        if (historyIndex < history.length - 1) {
          setHistoryIndex((i) => {
            const ni = i + 1;
            setInput(history[ni]);
            return ni;
          });
        } else {
          // past the newest -> clear
          setHistoryIndex(null);
          setInput('');
        }
      }
      return;
    }

    if (e.key === 'Enter') {
      execute(input);
      setInput('');
      setHistoryIndex(null);
    } else if (e.key.length === 1 || e.key === 'Backspace') {
      if (e.key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else {
        setInput((prev) => prev + e.key);
      }
      // If the user types while viewing history, drop back to editing mode
      if (historyIndex !== null) setHistoryIndex(null);
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
        onClick={() => {
          // Focus input when clicking terminal body, but prevent scroll
          if (inputRef.current) {
            const scrollY = window.scrollY;
            inputRef.current.focus({ preventScroll: true });
            window.scrollTo(0, scrollY);
          }
        }}
      >
        {lines.map((line, index) => {
          if (typeof line === 'object' && line.__component__) {
            return (
              <div key={index} className="terminal-line">
                {line.element}
              </div>
            );
          }

          if (typeof line === 'string' && line.startsWith('__HTML__')) {
            return (
              <div
                key={index}
                className="terminal-line"
                dangerouslySetInnerHTML={{ __html: line.replace('__HTML__', '') }}
              />
            );
          }

          const isVersion =
            typeof line === 'string' &&
            (line.toLowerCase().startsWith('version') ||
              line.toLowerCase().startsWith('v'));

          return (
            <div
              key={index}
              className={`terminal-line ${isVersion ? 'version' : ''}`}
            >
              {line}
            </div>
          );
        })}

        <div className="input-line">
          <span className="prompt">&gt;&nbsp;</span>
          <span className="input-text">{input}</span>
          {focused && showCursor && <span className="block-cursor">█</span>}
          <input
            ref={inputRef}
            type="text"
            className="hidden-input"
            onKeyDown={handleKeyDown}
            onFocus={(e) => {
              setFocused(true);
            }}
            onBlur={() => setFocused(false)}
            autoFocus={typeof window !== 'undefined' && window.innerWidth >= 768}
          />
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
});

export default Terminal;
