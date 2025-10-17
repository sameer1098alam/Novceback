import React from "react";

export default function KPICard({ active = false, label, value, icon, tone = "text-primary", onClick }) {
  return (
    <button
      type="button"
      className={`kpi-card w-100 text-start hover-lift fade-in ${active ? "border border-primary" : ""}`}
      onClick={onClick}
    >
      <div className="text-muted">
        <i className={`bi ${icon} me-1`} /> {label}
      </div>
      <div className={`fw-semibold fs-5 ${tone} kpi-value`}>{value}</div>
    </button>
  );
}


