import React from "react";
import { getCurrentChecker } from "../services/auth";

export default function ProfileMenu({ handleLogout }) {
  const checker = getCurrentChecker();
  return (
    <div className="dropdown">
      <button className="avatar-trigger" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Profile">
        <span className="avatar-initials">{checker.initials}</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <span className="dropdown-item-text text-muted">
            <i className="bi bi-person me-2"></i>
            {checker.name}
          </span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </li>
      </ul>
    </div>
  );
}