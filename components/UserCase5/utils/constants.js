import React from "react";

export function statusBadge(status){
  const map = {
    PENDING_REVIEW: { cls:"badge badge-status pending",  label:"PENDING REVIEW" },
    APPROVED:       { cls:"badge badge-status approved", label:"APPROVED" },
    REJECTED:       { cls:"badge badge-status rejected", label:"REJECTED" }
  };
  const info = map[status]; if(!info) return status;
  return React.createElement("span",{className:info.cls},info.label);
}

export function decisionBadge(decision){
  const cls = decision === "APPROVED" ? "badge bg-success" : "badge bg-danger";
  return React.createElement("span",{className:cls},decision);
}


