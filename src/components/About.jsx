// src/components/About.jsx
import TerminalIcon from './common/TerminalIcon';
import DownloadIcon from './common/DownloadIcon';
import TabIcon from './common/TabIcon';

export default function About({ onCommand }) {
  return (
    <div className="section-container lg">
      <h3>About</h3>
      <div className="scrollable-about">
        <p>
          I'm <span className="text-green">Jonathan Dabu</span> — a{' '}
          software engineer specializing in{' '}
          <span className="text-pink">test automation</span>,{' '}
          <span className="text-gold">game systems</span>, and{' '}
          <span className="text-blue">developer tools</span>.
        </p>

        <div className="doc-table">
          {/* Resume Row */}
          <div className="doc-row">
            <div className="doc-label">Resume</div>
            <div className="doc-icons">
              {/* Open resume in terminal-style viewer */}
              <TerminalIcon
                command="view resume"
                onCommand={onCommand}
                title="Open in Terminal"
              />

              {/* Direct file download */}
              <DownloadIcon
                url="/files/JonathanDabu_Resume.pdf"
                filename="JonathanDabu_Resume.pdf"
                title="Download Resume"
              />

              {/* Open in a new browser tab */}
              <TabIcon
                url="/files/JonathanDabu_Resume.pdf"
                title="Open Resume in new tab"
              />
            </div>
          </div>

          {/* Cover Letter Row */}
          <div className="doc-row">
            <div className="doc-label">Cover Letter</div>
            <div className="doc-icons">
              {/* Keeps your current command behavior (even if the command is added later) */}
              <TerminalIcon
                command="coverletter"
                onCommand={onCommand}
                title="Open in Terminal"
              />

              {/* Direct file download */}
              <DownloadIcon
                url="/files/JonathanDabu_CoverLetter.pdf"
                filename="JonathanDabu_CoverLetter.pdf"
                title="Download Cover Letter"
              />

              {/* Open in a new browser tab */}
              <TabIcon
                url="/files/JonathanDabu_CoverLetter.pdf"
                title="Open Cover Letter in new tab"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
