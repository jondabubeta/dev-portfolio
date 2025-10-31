// src/components/About.jsx
import TerminalIcon from './common/TerminalIcon';
import DownloadIcon from './common/DownloadIcon';
import TabIcon from './common/TabIcon';

export default function About({ onCommand }) {
  return (
    <div className="section-container lg">
      <h3>About</h3>
      <div className="scrollable-table">
        <div className="panel-table">
        <p>
          I'm <span className="text-green">Jonathan Dabu</span> — a{' '}
          software engineer specializing in{' '}
          <span className="text-pink">test automation</span>,{' '}
          <span className="text-gold">game systems</span>, and{' '}
          <span className="text-blue">developer tools</span>.
        </p>
          {/* Resume Row */}
          <div className="panel-row">
            <span className="panel-label">Resume</span>
            <span className="panel-extra">
              <div className="doc-icons">
                <TerminalIcon
                  command="view resume"
                  onCommand={onCommand}
                  title="Open in Terminal"
                />
                <DownloadIcon
                  url="/files/JonathanDabu_Resume.pdf"
                  filename="JonathanDabu_Resume.pdf"
                  title="Download Resume"
                />
                <TabIcon
                  url="/resume/"
                  title="Open Resume page"
                />
              </div>
            </span>
          </div>

          {/* Cover Letter Row */}
          <div className="panel-row">
            <span className="panel-label">Cover Letter</span>
            <span className="panel-extra">
              <div className="doc-icons">
                <TerminalIcon
                  command="view cv"
                  onCommand={onCommand}
                  title="Open in Terminal"
                />
                <DownloadIcon
                  url="/files/JonathanDabu_CoverLetter.pdf"
                  filename="JonathanDabu_CoverLetter.pdf"
                  title="Download Cover Letter"
                />
                <TabIcon
                  url="/cv/"
                  title="Open CV page"
                />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
