import educationData from '../../../data/education.json';

export default function EducationViewer() {
  return (
    <div>
      {educationData.map((edu, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <div><strong>{edu.degree}</strong> in {edu.field}</div>
          <div>{edu.institution} ({edu.year})</div>
        </div>
      ))}
    </div>
  );
}
