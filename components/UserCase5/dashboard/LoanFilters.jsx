import React from "react";
import ModernSearch from "../ui/ModernSearch";

export default function LoanFilters({ filters, onChange }) {
  return (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
      <ModernSearch
        value={filters.q}
        onChange={(v) => onChange({ ...filters, q: v })}
        onSubmit={() => { /* handled by parent filtering */ }}
        placeholder="Search by name, type, or ID"
      />
    </div>
  );
}


