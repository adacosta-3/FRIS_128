// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import "./Login.css";
import logo from '../../assets/images/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

      console.log("Login successful, username:", data.username);
      login(data.token, data.username);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <div className="login-page-wrapper">
        <div className="left-panel">
          <div className="logo-section">
            <img src={logo} alt="UP System Logo / FRIS Logo" className="website-logo" />
          </div>
        </div>

        <div className="right-panel">
          <div className="modal-content">
            <div className="section-title">
              <div className="text">
                University of the Philippines Manila
              </div>
              <div className="heading">
                Faculty and REPS
                <br />
                Information System
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email*</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password*</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
              </div>

              <div className="form-actions-container">
                <div className="buttons">
                  <button type="submit" className="button primary">
                    Log In
                  </button>

                  <button type="button" className="button secondary">
                    <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M21.5 11.79C21.5 15.94 19.29 21 12.63 21C7.62461 21.0332 3.53852 17.0053 3.5 12C3.53852 6.99461 7.62461 2.9667 12.63 2.99996C14.7007 3.00764 16.7085 3.71213 18.33 4.99996C18.442 5.09149 18.5109 5.22557 18.52 5.36996C18.5206 5.51605 18.463 5.65637 18.36 5.75996C17.709 6.35516 17.0882 6.98261 16.5 7.63996C16.3289 7.82826 16.0422 7.85432 15.84 7.69996C14.9161 7.01624 13.7888 6.66394 12.64 6.69996C9.68528 6.69996 7.29 9.09524 7.29 12.05C7.29 15.0047 9.68528 17.4 12.64 17.4C15.64 17.4 16.91 16.12 17.57 13.85H13C12.7239 13.85 12.5 13.6261 12.5 13.35V10.7C12.5 10.4238 12.7239 10.2 13 10.2H21C21.2302 10.1985 21.4244 10.3711 21.45 10.6C21.4871 10.9955 21.5038 11.3927 21.5 11.79Z"
                          fill="white"
                      />
                    </svg>
                    <span>Log In with Google</span>
                  </button>
                </div>

                <div className="links">
                  <a href="#forgot-password">Forgot your password?</a>
                  <div className="content">
                    <span>Don't have an account?</span>
                    <a href="#signup">Sign Up</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
