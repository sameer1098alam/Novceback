import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScImage1 from '../Images/Sc-Image1.jpeg';
import './Login.css';

function LoginPage() {
  const navigate = useNavigate();

  // States
  const [role, setRole] = useState('customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Static password for demo
  const STATIC_PASSWORD = '1234';

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!username.trim() || !password.trim()) {
      alert('⚠️ Please enter both username and password.');
      return;
    }

    // ✅ Password check
    if (password !== STATIC_PASSWORD) {
      alert('❌ Incorrect password. Try again!');
      return;
    }

    // ✅ Success message
    alert(`✅ Login successful as ${role.toUpperCase()}!`);

    // ✅ Navigate based on role
    switch (role) {
      
      case 'maker':
        navigate('/maker-dashboard');
        break;

        case 'checker':
        navigate('/checker-dashboard');
        break;
      
      default:
        navigate('/');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        {/* ===== FORM SECTION ===== */}
        <div className="auth-form-section">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Login to access your Standard Chartered account</p>
            <button className="back-btn" onClick={handleBackToHome}>
              ← Back to Home
            </button>
          </div>

          {/* ===== LOGIN FORM ===== */}
          <form onSubmit={handleFormSubmit} className="auth-form">
            {/* 🔽 Role Dropdown */}
            <div className="form-group">
              <label htmlFor="role">Login As</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="customer">Customer</option>
                <option value="maker">Maker</option>
                <option value="checker">Checker</option>
              </select>
            </div>

            {/* 🔽 Username */}
            <div className="form-group">
              <label htmlFor="username">Username / Bank ID</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or customer ID"
                required
              />
            </div>

            {/* 🔽 Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* 🔽 Options */}
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            {/* 🔽 Submit */}
            <button type="submit" className="submit-btn">
              <span className="lock-icon">🔒</span> LOGIN
            </button>
          </form>

          {/* ===== Footer Section ===== */}
          <div className="form-footer">
            <p>
              Don’t have an account?{' '}
              <span className="switch-form" onClick={handleSignupClick}>
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* ===== IMAGE SECTION ===== */}
        <div className="auth-image-section">
          <img
            src={ScImage1}
            alt="Standard Chartered Banking"
            className="auth-image"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
