import React, { useState, useEffect } from "react";
// Temporarily reference existing submodules under userstory5 until full rename is applied
import CheckerNavbar from "./layout/CheckerNavbar";
import LoansQueuePage from "./pages/LoansQueuePage";
import LoanDetailPage from "./pages/LoanDetailPage";
import HistoryPage from "./pages/HistoryPage";
import NotificationsPage from "./pages/NotificationsPage";
import { getLoanById } from "./services/api";

export default function Checker(){
  const [currentPage, setCurrentPage] = useState('loans'); // loans | history | notifications | loan-detail
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize notifications
    setNotifications([]);
    
    // Ensure Bootstrap CSS and Icons are loaded
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    if (!document.querySelector('link[href*="bootstrap@5"]')) {
      document.head.appendChild(bootstrapCSS);
    }
    
    const iconsCSS = document.createElement('link');
    iconsCSS.rel = 'stylesheet';
    iconsCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css';
    if (!document.querySelector('link[href*="bootstrap-icons"]')) {
      document.head.appendChild(iconsCSS);
    }
  }, []);

  // Handle loan selection for detail view
  const handleLoanClick = async (loan) => {
    if (!loan || !loan.applicationId) {
      console.error('Invalid loan data:', loan);
      return;
    }

    setLoading(true);
    try {
      // Fetch full loan details using the API
      const fullLoanDetails = await getLoanById(loan.applicationId);
      if (fullLoanDetails) {
        setSelectedLoan(fullLoanDetails);
        setCurrentPage('loan-detail');
      } else {
        throw new Error('No loan details found');
      }
    } catch (error) {
      console.error('Error fetching loan details:', error);
      alert('Error loading loan details. Please try again.');
      // Fallback to the basic loan data
      setSelectedLoan(loan);
      setCurrentPage('loan-detail');
    } finally {
      setLoading(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    console.log('Back button clicked, current page:', currentPage);
    if (currentPage === 'loan-detail') {
      setCurrentPage('loans');
      setSelectedLoan(null);
    }
  };


  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
      window.location.href = '/';
    }
  };

  return (
    <div className="app" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Checker Navbar */}
      <CheckerNavbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        handleLogout={handleLogout}
      />

      <div className="container py-3">
        {/* Debug info - remove this in production */}
        <div className="alert alert-info mb-3" style={{ fontSize: '0.8rem' }}>
          <strong>Debug:</strong> Current page: {currentPage} | Loading: {loading ? 'Yes' : 'No'} | Selected loan: {selectedLoan ? selectedLoan.applicationId : 'None'}
        </div>
        
        {/* Main Content */}
        <div className="main-content" style={{ minHeight: 'calc(100vh - 200px)' }}>
          {currentPage === 'loans' && (
            <LoansQueuePage
              onLoanClick={handleLoanClick}
              searchQuery={searchQuery}
              onViewHistory={() => setCurrentPage('history')}
            />
          )}

          {currentPage === 'history' && (
            <HistoryPage />
          )}

          {currentPage === 'notifications' && (
            <NotificationsPage
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}

          {currentPage === 'loan-detail' && selectedLoan && !loading && (
            <LoanDetailPage
              loan={selectedLoan}
              onBack={handleBack}
              onApprove={() => {
                alert('Loan approved successfully');
                handleBack();
              }}
              onReject={() => {
                alert('Loan rejected successfully');
                handleBack();
              }}
            />
          )}

          {currentPage === 'loan-detail' && loading && (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading loan details...</p>
            </div>
          )}

          {currentPage === 'loan-detail' && !selectedLoan && (
            <div className="no-loan" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Select a loan to view details</h3>
              <p>Choose a loan from the queue to view details and take action</p>
              <button
                className="btn btn-primary back-btn"
                onClick={() => setCurrentPage('loans')}
              >
                ← Back to Loans
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}