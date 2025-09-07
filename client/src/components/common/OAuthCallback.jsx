import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusCard from './StatusCard';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const OAuthCallback = () => {
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Processing your authentication...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const rawState = urlParams.get('state');

        if (!code) {
          setStatus('error');
          setMessage('Authorization code not found.');
          return;
        }

        let userInfo = {};
        if (rawState) {
          try {
            userInfo = JSON.parse(rawState);
          } catch {
            userInfo = { provider: urlParams.get('provider') || 'gmail' };
          }
        }

        setMessage(`Hello ${userInfo.name || ''}! Saving your credentials to n8n...`);

        const response = await fetch(`${API_BASE}/api/auth/callback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            state: userInfo,
            provider: userInfo.provider,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setStatus('success');
          setMessage(
            `✅ Success! Your ${userInfo.provider} account has been connected and saved to n8n.`
          );
        } else {
          setStatus('error');
          setMessage(`Error: ${result.message || 'Failed to save credentials'}`);
        }
      } catch (error) {
        console.error('Callback error:', error);
        setStatus('error');
        setMessage('An error occurred while processing your authentication.');
      }
    };

    handleCallback();
  }, [location]);

  // Render different cards based on status
  if (status === 'processing') {
    return (
      <StatusCard
        type="success"
        title="Processing..."
        message={message}
        redirectAfterMs={0}  // no auto-redirect during processing
        redirectTo="/"
      />
    );
  }

  if (status === 'success') {
    return (
      <StatusCard
        type="success"
        title="Success!"
        message={message}
        redirectAfterMs={10000}
        redirectTo="/"
        onClose={() => navigate('/')}
      />
    );
  }

  if (status === 'error') {
    return (
      <StatusCard
        type="error"
        title="Error"
        message={message}
        redirectAfterMs={10000}
        redirectTo="/"
        onClose={() => navigate('/')}
      />
    );
  }

  return null;
};

export default OAuthCallback;
