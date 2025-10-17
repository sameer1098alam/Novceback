import React, { useState } from "react";
import { approveLoan, rejectLoan } from "../services/api";
import ToggleConfirm from "../ui/ToggleConfirm";

export default function ActionBar({ loan, onApprove, onReject }) {
  const [comments, setComments] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [confirmFinal, setConfirmFinal] = useState(false);

  const ping = () => {
    window.dispatchEvent(new Event("loans-updated"));
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const doApprove = async () => {
    setBusy(true);
    const res = await approveLoan(loan.applicationId, { comments });
    setMsg(res.message);
    setBusy(false);
    setDone(true);
    ping();
    setTimeout(() => onApprove(), 450);
  };

  const doReject = async () => {
    if (!comments.trim()) {
      setMsg("Rejection comments are mandatory.");
      return;
    }
    setBusy(true);
    const res = await rejectLoan(loan.applicationId, { comments });
    setMsg(res.message);
    setBusy(false);
    setDone(true);
    ping();
    setTimeout(() => onReject(), 450);
  };

  const disabled = busy || done || !confirmFinal;

  return (
    <div className="section-card mt-3">
      <div className="alert alert-warning py-2 mb-3">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        This is your <strong>final decision</strong>. Approved items move to system processing; rejected items return to Maker/Customer.
      </div>

      <div className="mb-3">
        <ToggleConfirm
          id="confirmFinal"
          checked={confirmFinal}
          onChange={setConfirmFinal}
          label={`I confirm this is my final decision for Application #${loan.applicationId}.`}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Checker Comments</label>
        <textarea
          className={`form-control ${msg && !comments.trim() ? "is-invalid" : ""}`}
          rows="3"
          placeholder="Add reasoning (kept in audit trail)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          required
          disabled={done}
        />
        <div className="invalid-feedback">Comments are required to reject.</div>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-success"
          disabled={disabled}
          onClick={doApprove}
        >
          <i className="bi bi-check2-circle me-1" /> Approve &amp; Send to System
        </button>
        <button
          className="btn btn-outline-danger"
          disabled={disabled}
          onClick={doReject}
        >
          <i className="bi bi-x-circle me-1" /> Reject to Maker/Customer
        </button>
      </div>

      {msg && <div className="alert alert-info mt-2 py-2 m-0">{msg}</div>}
    </div>
  );
}
