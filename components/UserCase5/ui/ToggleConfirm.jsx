import React from "react";

export default function ToggleConfirm({ id, checked, onChange, label }) {
  return (
    <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" id={id} checked={checked} onChange={(e)=>onChange?.(e.target.checked)} />
      <label className="form-check-label" htmlFor={id}>{label}</label>
    </div>
  );
}


