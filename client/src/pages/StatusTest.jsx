import React, { useState } from 'react';
import StatusPanel from '../components/landing/StatusPanel';

const StatusTest = () => {
  const [activePanel, setActivePanel] = useState(null);

  const showSuccess = () => setActivePanel('success');
  const showError = () => setActivePanel('error');
  const closePanel = () => setActivePanel(null);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '30px',
      padding: '20px'
    }}>
      
      {/* Test Buttons */}
      {!activePanel && (
        <>
          <button 
            onClick={showSuccess}
            style={{ 
              padding: '15px 30px', 
              background: '#22C55E',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Test Success Page
          </button>
          
          <button 
            onClick={showError}
            style={{ 
              padding: '15px 30px', 
              background: '#dd7afd',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Test Error Page
          </button>
        </>
      )}

      {/* Success Panel */}
      {activePanel === 'success' && (
        <StatusPanel
          type="success"
          title="Success"
          message="Your credentials have been successfully stored."
          onClose={closePanel}
        />
      )}

      {/* Error Panel */}
      {activePanel === 'error' && (
        <StatusPanel
          type="error" 
          title="Error"
          message="Something went wrong. Please try again later."
          onClose={closePanel}
        />
      )}
    </div>
  );
};

export default StatusTest;
