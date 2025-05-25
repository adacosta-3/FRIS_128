import React, { useState } from 'react'; // Keep useState for state management
import "./Login.css"; // Import the CSS file
import logo from '../../assets/images/logo.png'; // Correct path to your logo file relative to LoginPage.jsx

// Assuming this is used somewhere to pass login credentials
const SAMPLE_USER = {
  email: 'baesjonathanralph@gmail.com',
  password: 'samplepass'
};

// The onLogin prop is crucial for handling successful logins
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [rememberMe, setRememberMe] = useState(false); // Not present in new JSX, but keep if needed for future

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error message on new submission attempt
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check credentials
    if (email === SAMPLE_USER.email && password === SAMPLE_USER.password) {
      // Assuming onLogin is a function passed as a prop from the parent component
      // This is where you'd typically redirect or update app state to show the main content
      onLogin(email);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page-wrapper"> {/* New wrapper for the whole page layout */}
      <div className="left-panel">
        <div className="logo-section">
          {/* You might want to use a more descriptive alt text for accessibility */}
          <img src={logo} alt="UP System Logo / FRIS Logo" className="website-logo" />
        </div>
      </div>

      <div className="right-panel">
        <div data-layer="Modal" className="modal-content"> {/* Renamed for clarity, as it's not the full modal anymore */}
          <div data-layer="Section Title" className="section-title">
            <div data-layer="Text" className="text">
              University of the Philippines Manila
            </div>
            <div data-layer="Heading" className="heading">
              Faculty and REPS
              <br />
              Information System
            </div>
          </div>

          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}

          <form className="form" onSubmit={handleSubmit}> {/* Attach handleSubmit here */}
            <div className="input-group"> {/* Renamed from 'Input' to avoid conflict if you have a component named Input */}
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                value={email} // Controlled component: bind value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password*</label>
              <input
                id="password"
                type="password"
                value={password} // Controlled component: bind value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required
              />
            </div>

            <div className="form-actions-container"> {/* Renamed from 'Container' for clarity */}
              <div className="buttons">
                {/* The "Log In" button now performs the form submission */}
                <button type="submit" className="button primary">
                  Log In
                </button>

                {/* This button should probably be type="button" to prevent form submission */}
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
                <a href="#forgot-password">Forgot your password?</a> {/* Updated href for clarity */}
                <div className="content">
                  <span>Don't have an account?</span>
                  <a href="#signup">Sign Up</a> {/* Updated href for clarity */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}