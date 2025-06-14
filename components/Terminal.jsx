
import React, { useState } from 'react';
import Home from '../views/Home';
import About from '../views/About';
import Projects from '../views/Projects';
import Contact from '../views/Contact';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [view, setView] = useState('home');

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      const trimmed = command.trim().toLowerCase();
      setHistory([...history, `> ${trimmed}`]);
      switch (trimmed) {
        case 'home':
        case 'about':
        case 'projects':
        case 'contact':
          setView(trimmed);
          break;
        case 'clear':
          setHistory([]);
          break;
        default:
          setHistory((h) => [...h, 'Command not found']);
      }
      setCommand('');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'home': return <Home />;
      case 'about': return <About />;
      case 'projects': return <Projects />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {history.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        <div className="terminal-input-line">
          <span>&gt; </span>
          <input
            autoFocus
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleInput}
            className="terminal-input"
          />
        </div>
      </div>
      <div className="terminal-view">{renderView()}</div>
    </div>
  );
};

export default Terminal;
