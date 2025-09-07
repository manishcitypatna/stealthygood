import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppCard from './components/common/AppCard'
import LandingPage from './pages/LandingPage'
import AuthForm from './components/common/AuthForm'
import OAuthCallback from './components/common/OAuthCallback'
import SuccessPage from './components/common/SuccessPage'
import Header from './components/common/Header'
import HeroSection from './components/common/HeroSection'
import ActiveIntegrations from './components/common/ActiveIntegrations'
import BrowseModal from './components/common/BrowseModal'
import { appsConfig } from './config/apps'
import './App.css'


// Main app selection page
const MainApp = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [browseModalOpen, setBrowseModalOpen] = useState(false);

  const handleAppSelect = (app) => {
    setSelectedApp(app);
    setShowForm(true);
  };

  const openBrowseModal = () => setBrowseModalOpen(true);
  const closeBrowseModal = () => setBrowseModalOpen(false);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    
    try {
      console.log('=== FRONTEND DEBUG ===');
      console.log('Form data:', formData);
      console.log('Selected app:', selectedApp);
      console.log('Sending request to:', `http://localhost:5000/api/auth/${selectedApp.id}`);
      
      const response = await fetch(`http://localhost:5000/api/auth/${selectedApp.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        if (selectedApp.id === 'hubspot' || selectedApp.id === 'streak') {
          window.location.href = `/success?provider=${selectedApp.id}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
        } else {
          console.log('OAuth URL received:', data.authUrl);
          window.location.href = data.authUrl;
        }
      } else {
        alert(`Failed to connect: ${data.message}`);
      }
    } catch (error) {
      console.error('Frontend error:', error);
      alert(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedApp(null);
  };

  return (
    <>
      <Header />
      <div className="app-container">
        {/* LEFT PANEL - App Selection */}
        <div className="left-panel">
          <h2 className="section-header">Works with your stack</h2>
          <p className="section-subheader">Choose an app to connect</p>
          
          {/* Primary App Buttons */}
          <button 
            className="app-button"
            onClick={() => handleAppSelect(appsConfig.primary.find(app => app.id === 'gmail'))}
          >
            Connect Gmail
          </button>
          
          <button 
            className="app-button"
            onClick={() => handleAppSelect(appsConfig.primary.find(app => app.id === 'hubspot'))}
          >
            Connect HubSpot
          </button>
          
          <button 
            className="app-button"
            onClick={() => handleAppSelect(appsConfig.primary.find(app => app.id === 'streak'))}
          >
            Connect Streak
          </button>
          
          <button 
            className="app-button"
            onClick={() => handleAppSelect(appsConfig.primary.find(app => app.id === 'outlook'))}
          >
            Connect Outlook
          </button>
          
          {/* Browse More Button */}
          <button className="app-button browse-more-button" onClick={openBrowseModal}>
            Browse more integrations
          </button>
        </div>

        {/* RIGHT PANEL - Company Information */}
        <div className="right-panel">
          <HeroSection />
          <ActiveIntegrations />
        </div>

        {/* Auth Forms */}
        {showForm && selectedApp && (
          <AuthForm
            app={selectedApp}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={loading}
          />
        )}

        {/* Browse More Modal */}
        <BrowseModal isOpen={browseModalOpen} onClose={closeBrowseModal} />
      </div>
    </>
  );
};

// Main App with Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/oauth2callback" element={<OAuthCallback />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
