import React from 'react';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      {/* Logo */}
      <div className="nav-logo">
        <img 
          src="/public/icons/Logo.png" 
          alt="Stealthy Good" 
          className="logo-image"
        />
      </div>

      {/* Center Menu Items */}
      <div className="nav-center">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Work</a>
        <a href="#" className="nav-link">Blog</a>
        <a href="#" className="nav-link">About</a>
        <a href="#" className="nav-link">Pricing</a>
      </div>

      {/* Contact Button */}
      <div className="nav-contact">
        <a href="#" className="contact-button">Contact</a>
      </div>
    </nav>
  );
};

export default NavigationBar;
