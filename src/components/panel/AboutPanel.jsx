import { TerminalIcon, DownloadIcon, TabIcon } from "../icons";
import aboutData from "../../data/about.json";

export default function AboutPanel({ onCommand, onNavigateDocument }) {
  const handleDocumentClick = (e, pageUrl) => {
    if (!onNavigateDocument) return;
    e.preventDefault();
    onNavigateDocument(pageUrl);
  };

  const handleOpenAbout = (e) => {
    if (!onNavigateDocument) return;
    e.preventDefault();
    onNavigateDocument('/about');
  };

  return (
    <div className="section-container lg">
      <h3>About</h3>

      <div>
        <p className="about-tagline">{aboutData.tagline}</p>
        <p className="about-bio">
          {aboutData.bio}
        </p>

        <div className="about-more-row">
          <a
            className="about-more-link"
            href="/about"
            title="See full about page"
            onClick={handleOpenAbout}
            style={{ textDecoration: 'none' }}
          >
            +MORE
          </a>
        </div>

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
