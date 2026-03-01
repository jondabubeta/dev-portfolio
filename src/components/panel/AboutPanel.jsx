import React from "react";
import TerminalIcon from "../icons/TerminalIcon";
import DownloadIcon from "../icons/DownloadIcon";
import TabIcon from "../icons/TabIcon";
import aboutData from "../../data/about.json";

export default function AboutPanel({ onCommand }) {
  return (
    <div className="section-container lg">
      <h3>About</h3>

      <div>
        <p>
          {aboutData.intro}
        </p>
        
        <p>
          {aboutData.bio}
        </p>

        <div className="doc-table">
          {aboutData.documents.map((doc, index) => (
            <div key={index} className="doc-row">
              <a href={doc.pageUrl} className="doc-label" target="_blank" rel="noopener noreferrer">
                {doc.label}
              </a>
              <div className="doc-icons">
                <TerminalIcon
                  command={doc.command}
                  onCommand={onCommand}
                  title="Open in Terminal"
                />
                <DownloadIcon
                  url={doc.downloadUrl}
                  filename={doc.downloadFilename}
                  title={`Download ${doc.label}`}
                />
                <TabIcon
                  url={doc.pageUrl}
                  title={`Open ${doc.label} page`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
