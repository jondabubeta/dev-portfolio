import cover from '../../../data/coverletter.json';

export default function CvViewer() {
  const paragraphs = Array.isArray(cover.paragraphs) ? cover.paragraphs : [];
  const highlights = Array.isArray(cover.highlights) ? cover.highlights : [];

  return (
    <div className="output cv-view">
      <div className="terminal-h2">{cover.title}</div>
      <div className="mb cv-meta">{cover.date} - {cover.recipient}</div>

      {cover.opening && <div className="cv-opening">{cover.opening}</div>}

      {cover.intro && <div className="cv-intro exp-summary">{cover.intro}</div>}

      {paragraphs.map((p, i) => (
        <div key={i} className="cv-paragraph">{p}</div>
      ))}

      {highlights.length > 0 && (
        <div className="cv-highlights">
          <div className="cv-subhead">Selected highlights</div>
          <ul>
            {highlights.map((h, i) => (
              <li key={i}>&gt; {h}</li>
            ))}
          </ul>
        </div>
      )}

      {cover.closing && <div className="cv-closing">{cover.closing}</div>}

      {cover.signature && (
        <div className="cv-signature">{cover.signature.split('\n').map((s, i) => <div key={i}>{s}</div>)}</div>
      )}
    </div>
  );
}
