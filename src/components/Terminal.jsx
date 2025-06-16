import React, { useState, useEffect, useRef } from 'react';
import { handleCommand } from '../utils/handleCommand';
import { splashTextAnsiShadow } from './splashText';
import { welcomeText } from './welcomeText';
import '../styles/terminal.css';

function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setLines([splashTextAnsiShadow, '', welcomeText]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor(prev => !prev);
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
        setLines(prev => [...prev, `> ${command}`, response]);
      }
      setInput('');
    } else if (e.key.length === 1 || e.key === 'Backspace') {
      // Allow character input and backspace
      if (e.key === 'Backspace') {
        setInput(prev => prev.slice(0, -1));
      } else {
        setInput(prev => prev + e.key);
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
        <div className="terminal-title">JDabu Portfolio — zsh — 80x24</div>
      </div>

      <div
        className="terminal-body"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <pre key={index} className="terminal-line">{line}</pre>
        ))}

        <div className="input-line">
          <span className="prompt">&gt;&nbsp;</span>
          <span className="input-text">{input}</span>
          {showCursor && <span className="block-cursor">█</span>}
          {/* Hidden input for actual keyboard input */}
          <input
            ref={inputRef}
            type="text"
            className="hidden-input"
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}

export default Terminal;
