import { useRef } from 'react';
import Terminal from './components/Terminal';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contacts from './components/Contacts';
import Experience from './components/Experience';
import Current from './components/Current';
import './styles/global.css';
import './styles/about.css';
import './styles/experience.css';
import './styles/projects.css';
import './styles/skills.css';
import './styles/current.css';

function App() {
  const terminalRef = useRef();
  const onCommand = (cmd) => terminalRef.current?.runCommand(cmd);

  return (
    <div className="page-wrapper">
      <aside className="side-panel">
        <About onCommand={onCommand} />
        <Experience />
        <Projects onCommand={onCommand} />
        <Skills onCommand={onCommand} />
        <Current />
        <Contacts onCommand={onCommand} />
      </aside>

      <div className="terminal-panel">
        <div className="terminal-wrapper">
          <Terminal ref={terminalRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
