// eslint-disable-next-line no-unused-vars
import Terminal from './components/Terminal';
import Contacts from "./components/Contacts";
import './styles/global.css';

function App() {
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

        <div className="section-container">
          <h3>Contact</h3>
          <p>Email: jonathan@example.com</p>
        </div>
      </aside>

      <div className="terminal-panel">
        <div className="terminal-wrapper">
          <Terminal />
        </div>
      </div>
    </div>
  );
}

export default App;
