import React from "react";

export default function DocumentViewer({ doc }) {
  // Compact attachment tile; preview placeholder by default
  const showImage = false;

  return (
    <div className="border rounded-3 p-2 h-100" style={{ borderColor: "var(--card-border)" }}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <strong className="text-truncate" title={doc.name}>{doc.name}</strong>
        <span className="badge bg-light text-dark">{doc.tag}</span>
      </div>

      <div className="ratio ratio-16x9 bg-light rounded-2 mb-2">
        {showImage ? (
          <img alt={doc.name} src={doc.url} className="rounded-2" />
        ) : (
          <div className="d-flex align-items-center justify-content-center text-muted">Preview</div>
        )}
      </div>

      <div className="d-flex gap-2">
        <a className="btn btn-sm btn-outline-primary" href={doc.url} target="_blank" rel="noreferrer">Open</a>
      </div>
    </div>
  );
}


