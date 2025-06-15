import React, { useState, useRef, useEffect } from 'react';
import { handleCommand } from './utils/handleCommand';

export default function App() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);

  const processCommand = (cmd) => {
    const output = handleCommand(cmd);
    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processCommand(input.trim());
    setInput('');
  };

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  return (
    <div className="terminal-container">
      <div className="terminal" ref={terminalRef}>
        <pre>Jonathan's Terminal Portfolio [Version 1.0.0]
Type "help" to see available commands.
</pre>
        {history.map((entry, index) => (
          <div key={index}>
            <div className="prompt">> {entry.command}</div>
            <div className="output">{entry.output}</div>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <span className="prompt">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="input"
          />
        </form>
      </div>
    </div>
  );
}
