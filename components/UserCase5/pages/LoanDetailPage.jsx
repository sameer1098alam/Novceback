import React from "react";
import AttachmentTile from "../ui/AttachmentTile";
import CibilCard from "../ui/CibilCard";
import ActionBar from "../details/ActionBar";

export default function LoanDetailPage({ loan, onBack, onApprove, onReject }) {
  if (!loan) return <div className="section-card">Loading…</div>;

  const isPending = loan.status === "PENDING_REVIEW";

  return (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">Application #{loan.applicationId}</h5>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Back
        </button>
      </div>

      {/* Applicant Info */}
      <div className="mb-3">
        <h6 className="text-muted">Applicant</h6>
        <div className="row g-2">
          <div className="col-6">
            <small className="text-muted">Name</small>
            <div className="fw-semibold">{loan.fullName || "N/A"}</div>
          </div>
          <div className="col-6">
            <small className="text-muted">DOB</small>
            <div>{loan.dob || "N/A"}</div>
          </div>
          <div className="col-6">
            <small className="text-muted">Gender</small>
            <div>{loan.gender || "N/A"}</div>
          </div>
          <div className="col-6">
            <small className="text-muted">Marital Status</small>
            <div>{loan.maritalStatus || "N/A"}</div>
          </div>
          <div className="col-6">
            <small className="text-muted">Phone</small>
            <div>{loan.phone || "N/A"}</div>
          </div>
          <div className="col-6">
            <small className="text-muted">Email</small>
            <div>{loan.email || "N/A"}</div>
          </div>
          <div className="col-12">
            <small className="text-muted">Address</small>
            <div>
              {loan.address?.current || "N/A"}
              {loan.address?.permanent &&
                ` | Permanent: ${loan.address.permanent}`}
            </div>
          </div>
        </div>
      </div>

      {/* Loan Info */}
      <div className="mb-3">
        <h6 className="text-muted">Loan</h6>
        <div className="row g-2">
          <div className="col-6">
            <small className="text-muted">Type</small>
            <div>{loan.loanType || "N/A"}</div>
          </div>
          <div className="col-6">
            <small className="text-muted">Amount</small>
            <div className="fw-semibold">
              ₹{" "}
              {loan.loanAmount
                ? loan.loanAmount.toLocaleString("en-IN")
                : "N/A"}
            </div>
          </div>
          <div className="col-6">
            <small className="text-muted">Duration</small>
            <div>
              {loan.loanDuration ? `${loan.loanDuration} months` : "N/A"}
            </div>
          </div>
          <div className="col-12">
            <small className="text-muted">Purpose</small>
            <div>{loan.purpose || "N/A"}</div>
          </div>
          <div className="col-12">
            <small className="text-muted">Status</small>
            <div>{loan.status || "N/A"}</div>
          </div>
        </div>
      </div>

      {/* Maker Comment */}
      {loan.makerComment && (
        <div className="mb-3">
          <h6 className="text-muted">Maker Comment</h6>
          <div
            className="p-2 rounded"
            style={{ background: "#f8fafc", border: "1px solid var(--card-border)" }}
          >
            {loan.makerComment}
          </div>
        </div>
      )}

      {/* Attachments */}
      <div className="mb-3">
        <h6 className="text-muted">Attachments</h6>
        <ul className="list-group">
          {(loan.documents || []).map((d, i) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={i}
            >
              <span className="text-truncate" style={{ maxWidth: "70%" }}>
                {d.name || "Document"}{" "}
                <span className="badge bg-light text-dark ms-2">
                  {d.tag || "File"}
                </span>
              </span>
              <a
                className="btn btn-sm btn-outline-primary rounded-pill"
                href={d.url || "#"}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* CIBIL Info */}
      <div className="mb-3">
        <h6 className="text-muted">CIBIL (mock)</h6>
        <CibilCard
          score={loan.cibil?.score || 0}
          risk={loan.cibil?.risk || "Unknown"}
        />
      </div>

      {/* Action Buttons */}
      {isPending && (
        <ActionBar loan={loan} onApprove={onApprove} onReject={onReject} />
      )}
    </div>
  );
}
