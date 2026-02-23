import React from 'react';
import aboutData from '../../../data/about.json';

const AboutViewer = () => {
  return (
    <div>
      <div className="text-green" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {aboutData.name}
      </div>
      <div className="text-blue" style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>
        {aboutData.title}
      </div>
      <div style={{ fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '1rem', opacity: 0.9 }}>
        {aboutData.tagline}
      </div>
      
      <p style={{ marginBottom: '1rem' }}>
        {aboutData.bio}
      </p>
      
      <div className="text-gold" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Highlights:
      </div>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {aboutData.highlights.map((highlight, index) => (
          <li key={index} style={{ marginBottom: '0.25rem' }}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
};

export default AboutViewer;
