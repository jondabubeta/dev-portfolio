// eslint-disable-next-line no-unused-vars
import { useRef } from 'react';
import Terminal from './components/Terminal';
import Contacts from './components/Contacts';
import './styles/global.css';

function App() {
  const terminalRef = useRef();

  const triggerContactCommand = () => {
    terminalRef.current?.runCommand('view contact');
  };

  return (
    <div className="page-wrapper">
      <aside className="side-panel">
        <div className="section-container">
          <h3>Home</h3>
          <p>Welcome to my terminal portfolio.</p>
        </div>

        <div className="section-container">
          <h3>About</h3>
          <p>
            I’m Jonathan, a developer focused on test automation, game systems,
            and web tools.
          </p>
        </div>

        <div className="section-container">
          <h3>Projects</h3>
          <ul>
            <li>Corporate Depths</li>
            <li>Analytics Dashboard</li>
            <li>Corgi Clicker</li>
          </ul>
        </div>

        <Contacts onCommand={triggerContactCommand} />
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
