import React from "react";
import TerminalIcon from "../common/TerminalIcon";
import DownloadIcon from "../common/DownloadIcon";
import TabIcon from "../common/TabIcon";

export default function AboutPanel({ onCommand }) {
  return (
    <div className="section-container lg">
      <h3>About</h3>

      <div className="scrollable-table">
        <p>
          I’m <span className="text-green">Jonathan Dabu</span> — a software
          engineer focused on <span className="text-pink">test automation</span>,{" "}
          <span className="text-gold">game systems</span>, and{" "}
          <span className="text-blue">developer tools</span>. Thanks for visiting!
        </p>

        <div className="doc-table">
          <div className="doc-row">
            <div className="doc-label">Resume</div>
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
                url="/resume.html"
                title="Open Resume page"
              />
            </div>
          </div>

          <div className="doc-row">
            <div className="doc-label">Cover Letter</div>
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
              {/* If/when you add a page, point this to /cover-letter.html */}
              <TabIcon
                url="/files/JonathanDabu_CoverLetter.pdf"
                title="Open Cover Letter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
