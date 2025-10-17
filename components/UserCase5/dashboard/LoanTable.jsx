import React, { useState } from "react";
import { statusBadge } from "../utils/constants";
import Pager from "../ui/Pager";

export default function LoanTable({ rows, loading, onOpen, emptyText = "No results found." }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const view = rows.slice(startIndex, startIndex + pageSize);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th><i className="bi bi-hash me-1" /> Application ID</th>
              <th><i className="bi bi-person me-1" /> Applicant</th>
              <th><i className="bi bi-journal-text me-1" /> Loan Type</th>
              <th><i className="bi bi-cash-coin me-1" /> Amount</th>
              <th><i className="bi bi-calendar2-week me-1" /> Submitted</th>
              <th><i className="bi bi-info-circle me-1" /> Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-center text-muted py-3">
                  Loading…
                </td>
              </tr>
            )}

            {!loading && view.map((r) => (
              <tr key={r.applicationId}>
                <td className="fw-semibold">{r.applicationId}</td>
                <td>{r.fullName}</td>
                <td>{r.loanType}</td>
                <td>₹ {r.loanAmount.toLocaleString("en-IN")}</td>
                <td>{new Date(r.submittedAt).toLocaleDateString()}</td>
                <td>{statusBadge(r.status)}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onOpen(r.applicationId)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}

            {!loading && view.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted py-3">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <small className="text-muted pager-meta d-block mt-2">
        Showing {view.length} of {rows.length} (Page {page} / {totalPages})
      </small>
      <Pager page={page} totalPages={totalPages} onPrev={goPrev} onNext={goNext} />
    </div>
  );
}


