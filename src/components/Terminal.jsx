// src/components/Terminal.jsx
import {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef
} from 'react';
import { handleCommand } from '../utils/handleCommand';
import { welcomeText } from './title/welcome';
import { version } from './title/version';

const splashText = 'JONATHAN DABU';
const splashTextMobile = 'JONATHAN DABU';

// Typing animation timing constants
const DEMO_COMMANDS = ['Start typing HERE', 'view resume', 'help', ''];
const TYPING_ANIMATION_DELAY = 1000;      // Initial delay before animation starts
const TYPING_CHARACTER_SPEED = 70;        // Delay between each character typed
const TYPING_PAUSE_DURATION = 800;        // Pause after typing a command
const BACKSPACE_CHARACTER_SPEED = 50;     // Delay between each character deleted
const COMMAND_PAUSE_DURATION = 1500;      // Pause between commands
const TYPING_DEMO_SESSION_KEY = 'portfolio:typing-demo-shown';

const Terminal = forwardRef((props, ref) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null); // null means editing current input
  const [showCursor, setShowCursor] = useState(true);
  const [splashFontSize, setSplashFontSize] = useState(null);
  const terminalEndRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const [focused, setFocused] = useState(true);
  const inputRef = useRef(null);
  const typingDemoCancelRef = useRef(null);

  // Conditional splash based on viewport width
  const splash = (typeof window !== 'undefined')
    ? window.innerWidth < 768 ? splashTextMobile
      : splashText
    : splashText;

  // Show version only at 1380px+
  const showVersion = (typeof window !== 'undefined' && window.innerWidth >= 1380);

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
    } else if (response === '__RESET__') {
      const splashLines = splash
        ? splash
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => ({
            __component__: true,
            element: (
              <span
                className="terminal-splash-name"
                style={splashFontSize ? { fontSize: `${splashFontSize}px` } : undefined}
              >
                {line}
              </span>
            ),
          }))
        : [];
      const versionLine = showVersion ? [version] : [];
      setLines([...splashLines, ...versionLine, '', welcomeText]);
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
    const name = 'JONATHAN DABU';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const updateSplashSize = () => {
      if (!terminalBodyRef.current || !context) return;

      const styles = window.getComputedStyle(terminalBodyRef.current);
      const paddingLeft = parseFloat(styles.paddingLeft || '0') || 0;
      const paddingRight = parseFloat(styles.paddingRight || '0') || 0;
      const innerWidth = terminalBodyRef.current.clientWidth - paddingLeft - paddingRight;
      const availableWidth = Math.max(innerWidth - 16, 0);
      context.font = '700 100px "JetBrains Mono"';
      const baseWidth = context.measureText(name).width;
      if (baseWidth <= 0) return;

      const nextSize = Math.floor((availableWidth / baseWidth) * 100 * 0.96);
      const clampedSize = Math.max(40, Math.min(nextSize, 200));
      setSplashFontSize(clampedSize);
    };

    updateSplashSize();
    window.addEventListener('resize', updateSplashSize);
    return () => window.removeEventListener('resize', updateSplashSize);
  }, []);

  useEffect(() => {
    const splashLines = splash
      ? splash
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => ({
            __component__: true,
            element: (
              <span
                className="terminal-splash-name"
                style={splashFontSize ? { fontSize: `${splashFontSize}px` } : undefined}
              >
                {line}
              </span>
            ),
          }))
      : [];
    const versionLine = showVersion ? [version] : [];
    setLines([...splashLines, ...versionLine, '', welcomeText]);
  }, [splash, showVersion, splashFontSize]);

  useEffect(() => {
    // Smooth scroll on desktop, but use instant on mobile to prevent over-scroll
    const isMobile = window.innerWidth < 768;
    terminalEndRef.current?.scrollIntoView({ 
      behavior: isMobile ? 'auto' : 'smooth',
      block: 'end'
    });
  }, [lines]);

  // Typing animation demo effect
  useEffect(() => {
    const isHomePage = window.location.pathname === '/';
    const hasShownTypingDemo = window.sessionStorage.getItem(TYPING_DEMO_SESSION_KEY) === 'true';

    if (!isHomePage || hasShownTypingDemo) return;

    window.sessionStorage.setItem(TYPING_DEMO_SESSION_KEY, 'true');

    let timeoutId;
    let isAnimating = true;
    typingDemoCancelRef.current = () => {
      isAnimating = false;
      if (timeoutId) clearTimeout(timeoutId);
    };

    const runTypingDemo = async () => {
      // Wait before starting demo
      await new Promise(resolve => {
        timeoutId = setTimeout(resolve, TYPING_ANIMATION_DELAY);
      });

      if (!isAnimating) return;

      // Demo commands sequence
      for (let cmdIndex = 0; cmdIndex < DEMO_COMMANDS.length; cmdIndex++) {
        const command = DEMO_COMMANDS[cmdIndex];
        if (!isAnimating) break;

        // Type the command character by character
        for (let i = 0; i <= command.length; i++) {
          if (!isAnimating) break;
          await new Promise(resolve => {
            timeoutId = setTimeout(() => {
              setInput(command.substring(0, i));
              resolve();
            }, TYPING_CHARACTER_SPEED);
          });
        }

        // Pause after typing
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, TYPING_PAUSE_DURATION);
        });

        if (!isAnimating) break;

        // Delete the input for next command (but not for the last one)
        if (cmdIndex < DEMO_COMMANDS.length - 1) {
          // Animate backspace
          for (let i = command.length; i >= 0; i--) {
            if (!isAnimating) break;
            await new Promise(resolve => {
              timeoutId = setTimeout(() => {
                setInput(command.substring(0, i));
                resolve();
              }, BACKSPACE_CHARACTER_SPEED);
            });
          }

          // Pause between commands
          await new Promise(resolve => {
            timeoutId = setTimeout(resolve, COMMAND_PAUSE_DURATION);
          });
        }
      }

      if (!isAnimating) return;

      // Animation complete - terminal input is now enabled
      // Keep the last typed command in the input for the user
    };

    runTypingDemo();

    return () => {
      isAnimating = false;
      if (timeoutId) clearTimeout(timeoutId);
      typingDemoCancelRef.current = null;
    };
  }, []);

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
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      typingDemoCancelRef.current?.();
      setLines((prev) => [...prev, `> ${input}^C`]);
      setInput('');
      setHistoryIndex(null);
      return;
    }

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
        ref={terminalBodyRef}
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
          <span className="input-text">{input}{focused && showCursor && <span className="block-cursor">█</span>}</span>
          <input
            ref={inputRef}
            type="text"
            className="hidden-input"
            onKeyDown={handleKeyDown}
            onFocus={() => {
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
