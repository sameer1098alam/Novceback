import React from "react";

export default function Pager({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pager-responsive mt-2">
      <div className="btn-group" role="group" aria-label="Pagination" style={{gap:'0.5rem'}}>
        <button
          className="btn btn-outline-primary rounded-pill px-3"
          disabled={page === 1}
          onClick={onPrev}
          aria-label="Previous page"
          title="Previous"
        >
          <i className="bi bi-chevron-left me-1" /> Previous
        </button>
        <button
          className="btn btn-primary rounded-pill px-4"
          disabled={page === totalPages}
          onClick={onNext}
          aria-label="Next page"
          title="Next"
        >
          Next <i className="bi bi-chevron-right ms-1" />
        </button>
      </div>
    </div>
  );
}


