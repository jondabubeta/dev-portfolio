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
          <br></br>
<ul className="doc-links">
  <li className="doc-entry">
    <span className="doc-text">Resume</span>
    <span className="doc-icons">
      <img src={terminalIcon} alt="Terminal Icon" className="icon-about" />
      <img src={downloadIcon} alt="Download Icon" className="icon-about" />
    </span>
  </li>
  <li className="doc-entry">
    <span className="doc-text">Cover Letter</span>
    <span className="doc-icons">
      <img src={terminalIcon} alt="Terminal Icon" className="icon-about" />
      <img src={downloadIcon} alt="Download Icon" className="icon-about" />
    </span>
  </li>
</ul>

          </p>
        </div>

        <div className="section-container">
          <h3>Experience</h3>
          <ul>
            <li>Neustar (SDET)</li>
            <li>Amazon Games (Target Role)</li>
            <li>Blizzard (Test Tools Contributor)</li>
          </ul>
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
