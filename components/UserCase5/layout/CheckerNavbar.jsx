import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import ModernSearch from "../ui/ModernSearch";
import { getNotifications } from "../services/api";

export default function CheckerNavbar({ 
  currentPage, 
  setCurrentPage, 
  searchQuery, 
  setSearchQuery,
  notifications,
  notificationOpen,
  setNotificationOpen,
  userMenuOpen,
  setUserMenuOpen,
  handleLogout
}) {
  const [notifCount, setNotifCount] = useState(0);

  const onSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      console.log('Searching for:', q);
    }
  };

  useEffect(() => {
    (async () => setNotifCount((await getNotifications()).length))();
    const h = () => getNotifications().then((n) => setNotifCount(n.length));
    window.addEventListener("notifications-updated", h);
    return () => window.removeEventListener("notifications-updated", h);
  }, []);

  // Force light theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-sc">
      <div className="container">
        {/* Logo / Brand */}
        <button 
          className="navbar-brand d-flex align-items-center" 
          title="My Queue"
          onClick={() => setCurrentPage('loans')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img
            src="/assets/sc-logo.png"
            alt="SCB"
            height="64"
            onError={(e) => {
              e.currentTarget.src = "https://www.sc.com/wp-content/themes/standard-chartered/images/standard-chartered-logo.svg";
            }}
          />
        </button>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button 
                className={`nav-link ${currentPage === 'loans' ? "active" : ""}`}
                onClick={() => setCurrentPage('loans')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <i className="bi bi-inbox me-1" /> My Queue
              </button>
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link ${currentPage === 'history' ? "active" : ""}`}
                onClick={() => {
                  console.log('History clicked, setting page to history');
                  setCurrentPage('history');
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <i className="bi bi-clock-history me-1" /> History
              </button>
            </li>
          </ul>

          {/* Right Section (Search, Notifications, Profile) */}
          <div className="navbar-actions d-flex align-items-center">
            <form className="d-flex" onSubmit={onSearch} role="search">
              <ModernSearch
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={() => {
                  const q = searchQuery.trim();
                  if (q) console.log('Searching for:', q);
                }}
                placeholder="Search by name, type, or ID"
              />
            </form>

            {/* Notifications Button */}
            <button
              className="btn btn-outline-primary position-relative rounded-pill"
              title="Notifications"
              style={{ marginRight: "0.65rem" }}
              onClick={() => {
                console.log('Notifications clicked, setting page to notifications');
                setCurrentPage('notifications');
              }}
            >
              <i className="bi bi-bell" />
              {notifCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{ fontSize: '0.65rem' }}>
                  {notifCount}
                </span>
              )}
            </button>

            {/* Profile Menu */}
            <ProfileMenu handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
}
