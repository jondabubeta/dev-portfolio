import skillsData from "../data/skills.json";
import "../styles/resume.css";

const CATEGORY_LABELS = {
  qa: "QA & Automation",
  devops: "DevOps",
  languages: "Programming Languages",
  db: "Databases",
  tools: "Tools & Platforms",
  web: "Web Development",
};

export default function SkillsPage() {
  const categories = Object.entries(skillsData);

  return (
    <div className="resume-page">
      <div className="resume-grid no-toc">
        <main className="resume-content">
          <div className="resume-page-header">
            <div>
              <div className="terminal-h1">Skills</div>
              <div className="subtitle">Automation, tooling, languages, and platforms</div>
            </div>
          </div>

          <section className="resume-section">
            {categories.map(([category, skills]) => (
              <div key={category} className="skills-category-section">
                <h2>{CATEGORY_LABELS[category] || category}</h2>

                <div className="skills-grid">
                  {skills.map((skill) => (
                    <div key={skill.name} className="skill-card">
                      <div className="skill-name text-blue"><strong>{skill.name}</strong></div>
                      <div className="skill-description text-orange">{skill.description}</div>
                      <div className="skill-experience">{skill.experience}</div>
                      {skill.tags && skill.tags.length > 0 && (
                        <div className="skill-tags">
                          {skill.tags.map(tag => (
                            <span key={tag} className="skill-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
