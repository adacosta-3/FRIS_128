import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/images/logo.png';

const SAMPLE_USER = {
  email: 'baesjonathanralph@gmail.com',
  password: 'samplepass'
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check credentials
    if (email === SAMPLE_USER.email && password === SAMPLE_USER.password) {
      onLogin(email);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        
        <img src={logo} alt="UP System Logo" className="logo" />
      </div>
      
      <div className="login-right">
        <div className="login-box">
          <h2>UNIVERSITY OF THE PHILIPPINES MANILA</h2>
          <h1>FACULTY AND REPS INFORMATION SYSTEM</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            
            </div>
            
            <button type="submit" className="login-button">Sign In</button>
            <button type="submit" className="login-button">
              Sign in with Google
            </button>
            <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
