const skills = [
  { name: 'TestNG', category: 'qa' },
  { name: 'Allure', category: 'qa' },
  { name: 'Selenium', category: 'qa' },
  { name: 'JUnit', category: 'qa' },
  { name: 'Postman', category: 'qa' },

  { name: 'JavaScript', category: 'web' },
  { name: 'React', category: 'web' },
  { name: 'Node.js', category: 'web' },
  { name: 'HTML/CSS', category: 'web' },
  { name: 'Express', category: 'web' },

  { name: 'Appium', category: 'mobile' },
  { name: 'Firebase', category: 'mobile' },
  { name: 'Android Studio', category: 'mobile' },

  { name: 'Jenkins', category: 'devops' },
  { name: 'Docker', category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },
  { name: 'Gradle', category: 'devops' },
  { name: 'Maven', category: 'devops' },

  { name: 'GCP', category: 'cloud' },
  { name: 'Secret Manager', category: 'cloud' },
  { name: 'Vercel', category: 'cloud' },

  { name: 'Java', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },
  { name: 'Retrofit', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },

  { name: 'Python', category: 'data' },
  { name: 'Pandas', category: 'data' },
  { name: 'SQL', category: 'data' },
  { name: 'Bash', category: 'data' },

  { name: 'Godot', category: 'game' },
  { name: 'Unity', category: 'game' },
  { name: 'ML Agents', category: 'game' },
  { name: 'HTML5 Canvas', category: 'game' },
];

export default function Skills({ onCommand }) {
  return (
    <div className="section-container sm">
      <h3>Skills</h3>
      <div className="scrollable-skills">
        <div className="skill-cloud">
          {skills.map(({ name, category }) => (
            <span
              key={name}
              className={`skill-pill ${category}-skill`}
              onClick={() => onCommand(`view skill --name="${name}"`)}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
