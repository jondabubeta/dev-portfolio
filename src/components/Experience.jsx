export default function Experience() {
  return (
    <div className="section-container sm">
      <h3>Experience</h3>
      <div className="scrollable-experience">
        <div className="experience-table">
          <div className="experience-row">
            <div className="experience-label">Neustar</div>
            <div className="experience-meta">SDET</div>
            <div className="experience-dates">2021 – 2023</div>
          </div>
          <div className="experience-row nested">
            <div className="experience-label">&nbsp;</div>
            <div className="experience-meta">QA Engineer</div>
            <div className="experience-dates">2020 – 2021</div>
          </div>
          <div className="experience-row">
            <div className="experience-label">Amazon Games</div>
            <div className="experience-meta">Target Role</div>
            <div className="experience-dates">Future</div>
          </div>
          <div className="experience-row">
            <div className="experience-label">Blizzard</div>
            <div className="experience-meta">Test Tools Contributor</div>
            <div className="experience-dates">2023 – Present</div>
          </div>
        </div>
      </div>
    </div>
  );
}
