import { useState } from 'react';
import skillsData from '../../../data/skills.json';

const CATEGORY_LABELS = {
  qa: 'QA & Automation',
  devops: 'DevOps & Cloud',
  web: 'Web Development',
  languages: 'Languages & Data',
  db: 'Databases',
  tools: 'Tools & Platforms',
};

export default function SkillsViewer({ args = {} }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const filters = {
    category: args.category || null,
    name: args.name || null
  };

  const categories = Object.entries(skillsData)
    .filter(([category]) => !filters.category || category === filters.category)
    .map(([category, skills]) => ({
      category,
      skills: skills.filter((skill) =>
        !filters.name ||
        skill.name.toLowerCase().includes(filters.name.trim().toLowerCase())
      ),
    }))
    .filter(({ skills }) => skills.length > 0);

  const toggleSkill = (key) => {
    setSelectedSkill((current) => current === key ? null : key);
  };

  return (
    <div className="terminal-skills">
      {!filters.name && (
        <div className="terminal-skills-hint">
          Select a skill to see how I&apos;ve used it.
        </div>
      )}

      {categories.map(({ category, skills }) => (
        <section className="terminal-skill-group" key={category}>
          <div className="terminal-skill-category">
            <span>{CATEGORY_LABELS[category] || category}</span>
            <span className="terminal-skill-count">{String(skills.length).padStart(2, '0')}</span>
          </div>

          <div className="terminal-skill-list">
            {skills.map((skill) => {
              const key = `${category}:${skill.name}`;
              const isOpen = selectedSkill === key || Boolean(filters.name);

              return (
                <div className={`terminal-skill-item ${isOpen ? 'is-open' : ''}`} key={key}>
                  <button
                    className="terminal-skill-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleSkill(key)}
                  >
                    <span className="terminal-skill-marker" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                    <span>{skill.name}</span>
                  </button>

                  {isOpen && (
                    <div className="terminal-skill-detail">
                      <div>{skill.description}</div>
                      <div className="terminal-skill-proof">{skill.experience}</div>
                      {skill.tags?.length > 0 && (
                        <div className="terminal-skill-tags">
                          {skill.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
