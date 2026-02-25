import educationData from '../../../data/education.json';

export default function EducationViewer() {
  return (
    <div>
      {educationData.map((edu, index) => {
        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <div className="text-blue">
              <strong>{edu.degree}</strong>
            </div>

            <div className="text-orange">
              in {edu.field}
            </div>

            <div className="text-muted">
              {edu.institution} ({edu.year})
            </div>
          </div>
        );
      })}
    </div>
  );
}
