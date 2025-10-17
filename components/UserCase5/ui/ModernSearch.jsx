import React from "react";

export default function ModernSearch({ value, onChange, onSubmit, placeholder = "Search" }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.();
    }
  };
  return (
    <div className="modern-search">
      <i className="bi bi-search ms-2 me-2 text-muted" role="button" onClick={onSubmit} title="Search"></i>
      <input
        className="modern-search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <i className="bi bi-x-circle me-2 text-muted" role="button" title="Clear" onClick={() => onChange?.("")}></i>
      )}
    </div>
  );
}


