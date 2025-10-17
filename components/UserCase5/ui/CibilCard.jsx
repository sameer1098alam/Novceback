import React from "react";

export default function CibilCard({ score, risk }) {
  return (
    <div className="section-card p-3 d-flex align-items-center justify-content-between hover-lift">
      <div className="d-flex align-items-center gap-3">
        <span className="display-6 fw-bold text-success m-0">{score}</span>
        <div className="fw-semibold">Risk: {risk}</div>
      </div>
      <div className="text-muted small">Latest pull: just now</div>
    </div>
  );
}


