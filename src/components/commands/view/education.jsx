import educationData from '../../../data/education.json';

export default function EducationViewer() {
  return (
    <div>
      {educationData.map((edu, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <div style={{ color: 'var(--color-green)' }}>
            <strong>{edu.degree}</strong>
          </div>
          <div style={{ color: 'var(--color-blue)' }}>
            in {edu.field}
          </div>
          <div style={{ color: 'var(--color-pink)' }}>
            {edu.institution} ({edu.year})
          </div>
        </div>
      ))}
    </div>
  );
}
