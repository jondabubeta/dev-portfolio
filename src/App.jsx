// eslint-disable-next-line no-unused-vars
import { useRef } from 'react';
import Terminal from './components/Terminal';
import Contacts from './components/Contacts';
import terminalIcon from './assets/terminal.png';
import downloadIcon from './assets/download.png';
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
            I'm Jonathan Dabu — a software engineer specializing in test automation,
            game systems, and developer tools.
          <div className="doc-table">
            <div className="doc-row">
              <div className="doc-label">Resume</div>
              <div className="doc-icons">
                <img src={terminalIcon} className="icon-sm" />
                <img src={downloadIcon} className="icon-sm" />
                
              </div>
            </div>
            <div className="doc-row">
              <div className="doc-label">Cover Letter</div>
              <div className="doc-icons">
                <img src={terminalIcon} className="icon-sm" />
                <img src={downloadIcon} className="icon-sm" />
              </div>
            </div>
          </div>
          </p>
        </div>

        <div className="section-container">
          <h3>Experience</h3>
          <div className="experience-table">
            <div className="experience-row">
              <div className="experience-label">Neustar</div>
              <div className="experience-meta">SDET</div>
            </div>
            <div className="experience-row">
              <div className="experience-label">Amazon Games</div>
              <div className="experience-meta">Target Role</div>
            </div>
            <div className="experience-row">
              <div className="experience-label">Blizzard</div>
              <div className="experience-meta">Test Tools Contributor</div>
            </div>
          </div>
        </div>

        <div className="section-container">
          <h3>Projects</h3>
          <ul>
            <li>Corporate Depths</li>
            <li>Analytics Dashboard</li>
            <li>Corgi Clicker</li>
            <li>Terminal Portfolio</li>
          </ul>
        </div>

        <div className="section-container">
          <h3>Skills</h3>
          <ul>
            <li>Java, JavaScript, Python</li>
            <li>Gradle, Jenkins, GitHub Actions</li>
            <li>Spring Boot, React, Node.js</li>
          </ul>
        </div>

        <div className="section-container">
          <h3>Blog</h3>
          <p>
            I occasionally share thoughts on dev workflows, automation, and game development.
          </p>
        </div>

        <Contacts onCommand={(cmd) => terminalRef.current?.runCommand(cmd)} />
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
