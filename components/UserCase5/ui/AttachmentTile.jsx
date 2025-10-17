import React from "react";

export default function AttachmentTile({ name, tag, href, preview = false }) {
  return (
    <div className="border rounded-3 p-2 h-100 hover-lift" style={{ borderColor: "var(--card-border)" }}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <strong className="text-truncate" title={name}>{name}</strong>
        <span className="badge bg-light text-dark">{tag}</span>
      </div>
      <div className="ratio ratio-16x9 bg-light rounded-2 mb-2">
        {preview ? (
          <img alt={name} src={href} className="rounded-2" />
        ) : (
          <div className="d-flex align-items-center justify-content-center text-muted">Preview</div>
        )}
      </div>
      <div className="d-flex gap-2">
        <a className="btn btn-sm btn-outline-primary" href={href} target="_blank" rel="noreferrer">Open</a>
      </div>
    </div>
  );
}


