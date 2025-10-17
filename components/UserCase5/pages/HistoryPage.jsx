import React, { useEffect, useMemo, useState } from "react";
import { getHistory } from "../services/api";
import { decisionBadge } from "../utils/constants";

const toDateInput = (t) => new Date(t).toISOString().slice(0, 10);
const DAYS30 = 1000 * 60 * 60 * 24 * 30;

export default function HistoryPage() {
  const [rows, setRows] = useState([]);
  const [from, setFrom] = useState(toDateInput(Date.now() - DAYS30));
  const [to, setTo] = useState(toDateInput(Date.now()));

  useEffect(() => {
    (async () => setRows(await getHistory()))();
  }, []);

  const filtered = useMemo(() => {
    const start = new Date(from).setHours(0, 0, 0, 0);
    const end = new Date(to).setHours(23, 59, 59, 999);
    return rows.filter((r) => r.timestamp >= start && r.timestamp <= end);
  }, [rows, from, to]);

  return (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h5 className="m-0">Decision History</h5>
        <div className="d-flex align-items-center gap-2">
          <label className="form-label m-0 small text-muted">From</label>
          <input type="date" className="form-control form-control-sm" value={from} onChange={(e) => setFrom(e.target.value)} />
          <label className="form-label m-0 small text-muted">To</label>
          <input type="date" className="form-control form-control-sm" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Applicant</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Decision</th>
              <th>When</th>
              <th>Checker</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.applicationId}>
                <td className="fw-semibold">{r.applicationId}</td>
                <td>{r.fullName}</td>
                <td>{r.loanType}</td>
                <td>₹ {r.loanAmount.toLocaleString("en-IN")}</td>
                <td>{decisionBadge(r.decision)}</td>
                <td>{new Date(r.timestamp).toLocaleString()}</td>
                <td>{r.checker}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">No records in this window.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


