import { useRef } from 'react';
import Terminal from './components/Terminal';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contacts from './components/Contacts';
import Experience from './components/Experience';
import Current from './components/Current';
import './styles/index.css';

function App() {
  const terminalRef = useRef();
  const onCommand = (cmd) => terminalRef.current?.runCommand(cmd);

  return (
    <div className="page-wrapper">
      {/* Static Side Panel (always shown on desktop, hidden on mobile via CSS) */}
      <aside className="side-panel">
        <About onCommand={onCommand} />
        <Experience onCommand={onCommand} />
        <Projects onCommand={onCommand} />
        <Skills onCommand={onCommand} />
        <Current />
        <Contacts onCommand={onCommand} />
      </aside>

      {/* Terminal Panel */}
      <div className="terminal-panel">
        <Terminal ref={terminalRef} />
      </div>
    </div>
  );
}

export default App;
