import React, { useEffect, useMemo, useState } from "react";
import LoanFilters from "../dashboard/LoanFilters";
import LoanTable from "../dashboard/LoanTable";
import KPICard from "../ui/KPICard";
import { getLoans, getHistory } from "../services/api";

const toDateInput = (t) => new Date(t).toISOString().slice(0, 10);
const DAYS30 = 1000 * 60 * 60 * 24 * 30;

export default function LoansQueuePage({ onLoanClick, searchQuery, onViewHistory }) {
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [bucket, setBucket] = useState("PENDING");
  const [localQ, setLocalQ] = useState("");
  const [from, setFrom] = useState(toDateInput(Date.now() - DAYS30));
  const [to, setTo] = useState(toDateInput(Date.now()));

  const refresh = async () => {
    setLoading(true);
    const [q, h] = await Promise.all([getLoans(), getHistory()]);
    setQueue(q);
    setHistory(h);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    const f = () => refresh();
    window.addEventListener("loans-updated", f);
    return () => window.removeEventListener("loans-updated", f);
  }, []);

  const switchBucket = (key) => {
    setBucket(key);
    setLocalQ("");
  };

  const effectiveQ = (localQ !== "" ? localQ : searchQuery || "").toLowerCase();

  const rowsToShow = useMemo(() => {
    const start = new Date(from).setHours(0, 0, 0, 0);
    const end = new Date(to).setHours(23, 59, 59, 999);

    // When a URL/global search is active, search across ALL lists
    if (effectiveQ) {
      const pending = queue
        .filter((r) => r.status === "PENDING_REVIEW")
        .map((r) => ({ ...r, submittedAt: r.submittedAt, status: r.status }));
      const past = history
        .filter((h) => h.timestamp >= start && h.timestamp <= end)
        .map((h) => ({
          applicationId: h.applicationId,
          fullName: h.fullName,
          loanType: h.loanType,
          loanAmount: h.loanAmount,
          submittedAt: h.timestamp,
          status: h.decision,
        }));
      const merged = [...pending, ...past];
      return merged.filter(
        (l) =>
          l.fullName?.toLowerCase().includes(effectiveQ) ||
          l.loanType?.toLowerCase().includes(effectiveQ) ||
          String(l.applicationId).includes(effectiveQ)
      );
    }

    // Otherwise, use the selected bucket view
    if (bucket === "PENDING") {
      return queue
        .filter((r) => r.status === "PENDING_REVIEW")
        .map((r) => ({ ...r, decision: "PENDING_REVIEW" }));
    }

    return history
      .filter((h) => h.decision === bucket && h.timestamp >= start && h.timestamp <= end)
      .map((h) => ({
        applicationId: h.applicationId,
        fullName: h.fullName,
        loanType: h.loanType,
        loanAmount: h.loanAmount,
        submittedAt: h.timestamp,
        status: h.decision,
      }));
  }, [bucket, queue, history, from, to, effectiveQ]);

  const kpi = useMemo(() => {
    const start = new Date(from).setHours(0, 0, 0, 0);
    const end = new Date(to).setHours(23, 59, 59, 999);

    const approved = history.filter((x) => x.decision === "APPROVED" && x.timestamp >= start && x.timestamp <= end).length;
    const rejected = history.filter((x) => x.decision === "REJECTED" && x.timestamp >= start && x.timestamp <= end).length;
    const pending = queue.filter((r) => r.status === "PENDING_REVIEW").length;

    return { pending, approved30: approved, rejected30: rejected };
  }, [queue, history, from, to]);

  const title = bucket === "PENDING" ? "Pending Review" : bucket === "APPROVED" ? "Approved" : "Rejected";

  return (
    <>
      <div className="row g-3">
        <div className="col-6 col-md-4">
          <KPICard active={bucket === "PENDING"} label="Pending Review" value={kpi.pending} icon="bi-hourglass-split" tone="text-primary" onClick={() => switchBucket("PENDING")} />
        </div>
        <div className="col-6 col-md-4">
          <KPICard active={bucket === "APPROVED"} label="Approved" value={kpi.approved30} icon="bi-check2-circle" tone="text-success" onClick={() => switchBucket("APPROVED")} />
        </div>
        <div className="col-6 col-md-4">
          <KPICard active={bucket === "REJECTED"} label="Rejected" value={kpi.rejected30} icon="bi-x-circle" tone="text-danger" onClick={() => switchBucket("REJECTED")} />
        </div>
      </div>

      <div className="section-card mt-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-2">
          <h5 className="m-0">{title}</h5>

          {bucket !== "PENDING" && (
            <div className="d-flex align-items-center gap-2 ms-auto">
              <label className="form-label m-0 small text-muted">From</label>
              <input type="date" className="form-control form-control-sm" value={from} onChange={(e) => setFrom(e.target.value)} />
              <label className="form-label m-0 small text-muted">To</label>
              <input type="date" className="form-control form-control-sm" value={to} onChange={(e) => setTo(e.target.value)} />
              <button
                className="link-soft ms-2"
                style={{whiteSpace:'nowrap', background:'none', border:'none', color:'#0066cc'}}
                onClick={() => onViewHistory && onViewHistory()}
              >
                View full history
              </button>
            </div>
          )}
        </div>

        <LoanFilters filters={{ q: localQ }} onChange={(f) => setLocalQ(f.q)} />

        <LoanTable
          rows={rowsToShow}
          loading={loading}
          onOpen={(id) => {
            const loan = rowsToShow.find(r => r.applicationId === id);
            if (loan) onLoanClick(loan);
          }}
          emptyText={localQ || searchQuery ? "No results found." : "No records to show."}
        />
      </div>
    </>
  );
}