import educationData from '../../../data/education.json';

export default function EducationViewer() {
  return (
    <div>
      {educationData.map((edu, index) => {
        const isMasters = /master/i.test(String(edu.degree || ''));
        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <div className={isMasters ? 'text-blue' : 'text-green'}>
              <strong>{edu.degree}</strong>
            </div>

            <div className={isMasters ? 'text-muted' : 'text-blue'}>
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
