import React, { useEffect, useState } from "react";
import { getNotifications } from "../services/api";

export default function NotificationsPage({ notifications, setNotifications }) {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    (async () => {
      const fetchedItems = await getNotifications();
      setItems(fetchedItems);
      if (setNotifications) {
        setNotifications(fetchedItems);
      }
    })();
  }, [setNotifications]);

  return (
    <div className="section-card">
      <h5 className="mb-3">Notifications</h5>
      <ul className="list-group">
        {items.map((n, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-semibold">{n.title}</div>
              <small className="text-muted">{n.message}</small>
            </div>
            <span
              className={`badge rounded-pill ${
                n.type === "success" ? "bg-success" : "bg-primary"
              }`}
            >
              {n.type}
            </span>
          </li>
        ))}
        {items.length === 0 && (
          <li className="list-group-item text-muted">No notifications.</li>
        )}
      </ul>
    </div>
  );
}
