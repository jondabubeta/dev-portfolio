import { useRef } from 'react';
import { useState } from 'react';
import Terminal from './components/Terminal';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contacts from './components/Contacts';
import Experience from './components/Experience';
import Current from './components/Current';
import './styles/global.css';


function App() {
  const terminalRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const onCommand = (cmd) => terminalRef.current?.runCommand(cmd);

  return (
    <div className="page-wrapper">
      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Conditional Side Panel */}
      <aside className={`side-panel ${menuOpen ? 'open' : 'closed'}`}>
        <About onCommand={onCommand} />
        <Experience />
        <Projects onCommand={onCommand} />
        <Skills onCommand={onCommand} />
        <Current />
        <Contacts onCommand={onCommand} />
      </aside>

      <div className="terminal-panel">
        <Terminal ref={terminalRef} />
      </div>
    </div>
  );
}

export default App;
