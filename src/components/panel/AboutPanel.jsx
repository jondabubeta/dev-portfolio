import React from "react";
import { TerminalIcon, DownloadIcon, TabIcon } from "../icons";
import aboutData from "../../data/about.json";

export default function AboutPanel({ onCommand, onNavigateDocument }) {
  const handleDocumentClick = (e, pageUrl) => {
    if (!onNavigateDocument) return;
    e.preventDefault();
    onNavigateDocument(pageUrl);
  };

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
              <a
                href={doc.pageUrl}
                className="doc-label"
                onClick={(e) => handleDocumentClick(e, doc.pageUrl)}
              >
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
                  onNavigate={onNavigateDocument}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
