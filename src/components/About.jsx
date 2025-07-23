import terminalIcon from '../assets/terminal.png';
import downloadIcon from '../assets/download.png';

export default function About({ onCommand }) {
  return (
    <div className="section-container lg">
      <h3>About</h3>
      <div className="scrollable-about">
        <p>
          I'm Jonathan Dabu — a software engineer specializing in test automation,
          game systems, and developer tools.
        </p>

        <div className="doc-table">
          <div className="doc-row">
            <div className="doc-label">Resume</div>
            <div className="doc-icons">
              <img
                src={terminalIcon}
                className="icon-sm cursor-pointer"
                onClick={() => onCommand('resume')}
                alt="Open in Terminal"
              />
              <img
                src={downloadIcon}
                className="icon-sm cursor-pointer"
                onClick={() => onCommand('resume --download')}
                alt="Download"
              />
            </div>
          </div>
          <div className="doc-row">
            <div className="doc-label">Cover Letter</div>
            <div className="doc-icons">
              <img
                src={terminalIcon}
                className="icon-sm cursor-pointer"
                onClick={() => onCommand('coverletter')}
                alt="Open in Terminal"
              />
              <img
                src={downloadIcon}
                className="icon-sm cursor-pointer"
                onClick={() => onCommand('coverletter --download')}
                alt="Download"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
