import React, { useState, useEffect, useRef } from 'react';
import { handleCommand } from '../utils/handleCommand';

function Terminal() {
  const [lines, setLines] = useState(['Welcome to Jonathan\'s Portfolio Terminal!']);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [lines]);

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
    }
  };

  return (
    <div className="terminal-body">
      {lines.map((line, index) => (
        <div key={index} className="terminal-line">{line}</div>
      ))}
      <div className="input-line">
        <span className="prompt">&gt;</span>
        <input
          type="text"
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
      <div ref={terminalEndRef} />
    </div>
  );
}

export default Terminal;
