import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import NavigationBar from '../landing/NavigationBar';
import AnimatedBackground from '../landing/AnimatedBackground';
import StatusCard from './StatusCard';
import './SuccessPage.css';

/**
 * SuccessPage
 * - Wraps StatusCard inside the same AnimatedBackground + NavigationBar used by landing page
 * - Places the StatusCard on the LEFT (fixed) and a floating robot image on the RIGHT
 * - Keeps the StatusCard dynamic (reads provider/name/email from URL params)
 * - Uses redirectAfterMs on StatusCard (10s) to navigate back to "/"
 */
const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [appInfo, setAppInfo] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const provider = urlParams.get('provider');
    const name = urlParams.get('name');
    const email = urlParams.get('email');

    if (provider || name || email) {
      setAppInfo({ provider, name, email });
    } else {
      setAppInfo(null);
    }
  }, [location.search]);

  const getAppDisplayName = (provider) => {
    const displayNames = {
      gmail: 'Gmail',
      hubspot: 'HubSpot',
      outlook: 'Outlook',
      streak: 'Streak',
    };
    return displayNames[provider] || provider || 'the app';
  };

  const message = appInfo
    ? (
      <div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>
          {`✅ Success! Your ${getAppDisplayName(appInfo.provider)} account has been connected.`}
        </div>
        {appInfo.name && (
          <div style={{ color: '#f3f3f3', fontSize: '0.95rem', marginBottom: 6 }}>
            {`Account: ${appInfo.name} (${appInfo.email || ''})`}
          </div>
        )}
        <div style={{ marginTop: 6, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
          Redirecting you back to the main page...
        </div>
      </div>
    )
    : '✅ Success! Your account has been connected. Redirecting you back to the main page...';

  return (
    <div className="success-page-root">
      <NavigationBar />

      <AnimatedBackground>
        {/* Left fixed panel wrapper for StatusCard */}
        <div className="success-left-panel">
          <StatusCard
            type="success"
            title="Connection Successful!"
            message={message}
            redirectAfterMs={10000}
            redirectTo="/"
            onClose={() => navigate('/')}
          />
        </div>

        {/* Right floating robot illustration */}
        <div className="success-robot-wrapper" aria-hidden="true">
          <img
            src="/src/assets/icons/success.png"
            alt="robot success"
            className="success-robot-image"
            loading="eager"
          />
          <div className="success-robot-shadow" />
        </div>
      </AnimatedBackground>
    </div>
  );
};

export default SuccessPage;
