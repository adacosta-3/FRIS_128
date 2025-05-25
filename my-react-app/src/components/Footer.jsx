import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="copyright">© 2025 FRIS. All rights reserved.</span>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookies Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
