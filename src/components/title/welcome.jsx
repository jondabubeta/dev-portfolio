import React from 'react';

export const welcomeText = (
  <div className="welcome-container">
    <p>
      Welcome to <span className="text-green">Jonathan Dabu's</span> Terminal Portfolio!
    </p>

    <p>
      This interactive terminal lets you explore my{' '}
      <span className="text-blue">work</span>,{' '}
      <span className="text-pink">background</span>, and{' '}
      <span className="text-gold">contact info</span>.
    </p>

    <p>Type any of the following commands to get started:</p>

    <div className="command-list">
      <div className="command-item">
        • <span className="text-blue">help</span>
        <span className="command-description"> – List all available commands</span>
      </div>
      <div className="command-item">
        • <span className="text-blue">view resume</span>
        <span className="command-description"> – View my resume (use --full=true for full version)</span>
      </div>
      <div className="command-item">
        • <span className="text-blue">view about</span>
        <span className="command-description"> – Learn more about me and what I do</span>
      </div>
      <div className="command-item">
        • <span className="text-blue">view projects</span>
        <span className="command-description"> – View featured projects and case studies</span>
      </div>
      <div className="command-item">
        • <span className="text-blue">view contact</span>
        <span className="command-description"> – Get in touch or view my socials</span>
      </div>
      <div className="command-item">
        • <span className="text-blue">clear</span>
        <span className="command-description"> – Clear the terminal</span>
      </div>
    </div>

    <p>Type a command and press [Enter] to execute it.</p>
  </div>
);

export default welcomeText;
