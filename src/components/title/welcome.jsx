import React, { useState } from 'react';
import TerminalPng from '../../assets/terminal.png';
import TabPng from '../../assets/tab.png';
import DownloadPng from '../../assets/download.png';
import MailIcon from '../../assets/email.png';
import GitHubIcon from '../../assets/github.png';
import LinkedInIcon from '../../assets/linkedin.png';

const WelcomeContent = () => {
  const [isHowItWorksExpanded, setIsHowItWorksExpanded] = useState(false);
  const [isSidebarGuideExpanded, setIsSidebarGuideExpanded] = useState(false);

  return (
    <div className="welcome-container">
      <p style={{ fontSize: '2.0rem', marginBottom: '0.5rem', color: '#B1B1B1' }}>
        WELCOME TO MY PORTFOLIO!
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', marginTop: '1.5rem', color: '#B1B1B1' }}>
        I'm Jonathan, a Software Engineer specializing in development, test automation, and AI/ML.
        <br />
        This is my terminal portfolio.
      </p>

      <p className="section-title">
        <span 
          className="text-blue" 
          onClick={() => setIsHowItWorksExpanded(!isHowItWorksExpanded)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          title="Click to toggle"
        >
          HOW IT WORKS {isHowItWorksExpanded ? '▼' : '▶'}
        </span>
      </p>

      {isHowItWorksExpanded && (
        <>
          <p>
            This is an interactive command-line interface. Type a command in the input field below and press{' '}
            <span className="text-green">[Enter]</span> to execute it. The terminal will display the results above.
          </p>

          <div className="command-list">
            <div className="command-item">
              • Type <span className="text-blue">help</span> to see all available commands
            </div>
            <div className="command-item">
              • Use <span className="text-blue">clear</span> to clear the terminal screen
            </div>
            <div className="command-item">
              • Commands like <span className="text-blue">view resume</span> or <span className="text-blue">view projects</span> display content
            </div>
            <div className="command-item">
              • Some commands support flags (e.g., <span className="text-blue">--full=true</span>)
            </div>
          </div>
        </>
      )}

      <p className="section-title">
        <span 
          className="text-blue" 
          onClick={() => setIsSidebarGuideExpanded(!isSidebarGuideExpanded)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          title="Click to toggle"
        >
          SIDEBAR GUIDE {isSidebarGuideExpanded ? '▼' : '▶'}
        </span>
      </p>

      {isSidebarGuideExpanded && (
        <>
          <p>
            The sidebar on the left contains quick-access panels. Each item may have action icons:
          </p>

          <div className="command-list">
            <div className="command-item">
              • <img src={TerminalPng} alt="Terminal" style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '4px' }} />
              <span className="command-description"> – Executes the related command in the terminal</span>
            </div>
            <div className="command-item">
              • <img src={TabPng} alt="Tab" style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '4px' }} />
              <span className="command-description"> – Opens a detailed page in a new tab</span>
            </div>
            <div className="command-item">
              • <img src={DownloadPng} alt="Download" style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '4px' }} />
              <span className="command-description"> – Downloads files (like resume PDFs)</span>
            </div>
            <div className="command-item">
              • <img src={MailIcon} alt="Email" style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '8px', objectFit: 'contain' }} />
              <img src={GitHubIcon} alt="GitHub" style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '8px', objectFit: 'contain' }} />
              <img src={LinkedInIcon} alt="LinkedIn" style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '8px', objectFit: 'contain' }} />
              <span className="command-description"> – External links to email, GitHub, and LinkedIn</span>
            </div>
          </div>
        </>
      )}

      <p style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
        Type a command and press <span style={{ color: 'var(--color-orange)' }}>[Enter]</span> to execute it.
      </p>
    </div>
  );
};

export const welcomeText = <WelcomeContent />;

export default welcomeText;
