import React, { useEffect } from 'react';
import './StatusPanel.css';

const StatusPanel = ({ 
  type = 'success', // 'success' or 'error'
  title,
  message, 
  onClose,
  autoClose = false,
  autoCloseDelay = 3000
}) => {
  
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const getIcon = () => {
    if (type === 'success') {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path 
            d="M9 12L11 14L15 10" 
            stroke="#22C55E" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    } else {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path 
            d="M18 6L6 18M6 6L18 18" 
            stroke="#dd7afd" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  };

  const getTitle = () => {
    return title || (type === 'success' ? 'Success' : 'Error');
  };

  const getMessage = () => {
    if (message) return message;
    return type === 'success' 
      ? 'Your credentials have been successfully stored.'
      : 'Something went wrong. Please try again.';
  };

  return (
    <div className="status-panel">
      <div className="status-icon-container">
        {getIcon()}
      </div>
      
      <h2 className="status-title">{getTitle()}</h2>
      
      <p className="status-message">{getMessage()}</p>
      
      <button 
        className="status-close-btn"
        onClick={onClose}
      >
        Close
      </button>
      
      <p className="status-footer">
        For any kind of query, kindly contact your administration.
      </p>
    </div>
  );
};

export default StatusPanel;
