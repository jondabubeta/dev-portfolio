import React, { useState } from 'react';
import { handleCommand } from '../src/utils/handleCommand';
import '../styles/Terminal.css';

export default function Terminal({ setCurrentPage, setTheme }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setOutput((prev) => [...prev, `> ${input}`]);
    handleCommand(input, setOutput, setCurrentPage, setTheme);
    setInput('');
  };

  return (
    <div className="terminal-wrapper">
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
      </div>

      <div className="terminal-body">
        {output.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}

        <form className="terminal-input-line" onSubmit={onSubmit}>
          <span className="prompt">$</span>
          <input
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <span className="blinking-cursor">█</span>
        </form>
      </div>
    </div>
  );
}
