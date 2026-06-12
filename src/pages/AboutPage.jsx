import React from 'react';
import aboutData from '../data/about.json';
import '../styles/resume.css';

const SAMPLE_STORY = {
  now: [
    'I build test-first engineering systems that help teams ship quickly with confidence. My focus is reducing release risk with practical automation, strong observability, and clear developer workflows.',
    'Across game, embedded, and cloud environments, I design tools that make quality data visible and actionable, so teams can prioritize reliability work before it becomes production pain.'
  ],
  approach: [
    'I prefer lightweight architectures with fast feedback loops: deterministic test suites, reliable CI gates, and dashboards that expose flakiness trends over time.',
    'I enjoy partnering with product and engineering teams to identify the highest leverage automation opportunities and convert manual rituals into repeatable systems.'
  ],
  goals: [
    'Near-term, I am deepening my work in AI-assisted test generation and intelligent triage tooling.',
    'Long-term, I want to build developer platforms where quality signals are first-class product features, not an afterthought.'
  ]
};

export default function AboutPage() {
  return (
    <div className="resume-page">
      <div className="resume-grid no-toc">
        <main className="resume-content">
          <div className="resume-page-header">
            <div>
              <div className="terminal-h1">About</div>
              <div className="subtitle">Background, approach, and current focus</div>
            </div>
          </div>

          <section className="resume-section">
            <h2>Overview</h2>
            <p><span className="text-orange">Name:</span> {aboutData.name}</p>
            <p><span className="text-orange">Role:</span> {aboutData.title}</p>
            <p>{aboutData.tagline}</p>
            <p>{aboutData.bio}</p>
          </section>

          <section className="resume-section">
            <h2>Core Highlights</h2>
            <ul>
              {aboutData.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          <section className="resume-section">
            <h2>What I Am Building Now</h2>
            {SAMPLE_STORY.now.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="resume-section">
            <h2>How I Work</h2>
            {SAMPLE_STORY.approach.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="resume-section">
            <h2>Direction</h2>
            {SAMPLE_STORY.goals.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
