import React, { useState, useEffect, useRef } from 'react';
import './BrowseModal.css';

const allApps = [
  { id: 'gmail', label: 'Gmail', icon: 'gmail' },
  { id: 'hubspot', label: 'Hubspot', icon: 'hubspot' },
  { id: 'outlook', label: 'Outlook', icon: 'outlook' },
  { id: 'notion', label: 'Notion', icon: 'notion' },
  { id: 'gdrive', label: 'Google Drive', icon: 'g-drive' },
  { id: 'gsheets', label: 'Google Sheets', icon: 'g-sheets' },
  { id: 'dropbox', label: 'Dropbox', icon: 'dropbox' },
  { id: 'trello', label: 'Trello', icon: 'trello' },
  { id: 'figma', label: 'Figma', icon: 'figma' },
  { id: 'elevenlabs', label: 'Elevenlabs', icon: 'elevenlabs' },
  { id: 'copilot', label: 'Copilot', icon: 'copilot' },
  { id: 'n8n', label: 'n8n', icon: 'n8n' },
  { id: 'nvidia', label: 'Nvidia', icon: 'nvidia' },
  { id: 'openai', label: 'OpenAI', icon: 'openai' },
  { id: 'openrouter', label: 'Openrouter', icon: 'openrouter' },
  { id: 'perplexity', label: 'Perplexity', icon: 'perplexity' },
  { id: 'huggingface', label: 'Huggingface', icon: 'huggingface' },
  { id: 'meta', label: 'Meta', icon: 'meta' },
  { id: 'microsoft', label: 'Microsoft', icon: 'microsoft' },
  { id: 'midjourney', label: 'Midjourney', icon: 'midjourney' }
];

const BrowseModal = ({ isOpen, onClose, onSelectApp }) => {
  const [filteredApps, setFilteredApps] = useState(allApps);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const filtered = allApps.filter(app =>
      app.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApps(filtered);
  }, [searchTerm]);

  const handleAppClick = (app) => {
    onSelectApp(app);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="browse-modal-overlay">
      <div className="browse-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="browse-modal-title">
        <button className="modal-close-btn" aria-label="Close modal" onClick={onClose}>
          ×
        </button>
        
        <h2 id="browse-modal-title">Browse integrations</h2>
        
        <input
          type="search"
          className="browse-search"
          placeholder="Search integrations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        
        <div className="browse-grid">
          {filteredApps.map(app => (
            <div 
              key={app.id} 
              className="browse-item" 
              tabIndex={0} 
              role="button" 
              aria-label={`Connect ${app.label}`}
              onClick={() => handleAppClick(app)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleAppClick(app);
                }
              }}
            >
              <img 
                src={`/src/assets/icons/${app.icon}.svg`} 
                alt={`${app.label} icon`}
                className="browse-item-icon"
              />
              <span className="browse-item-label">{app.label}</span>
            </div>
          ))}
        </div>
        
        {filteredApps.length === 0 && (
          <div className="no-results">
            No integrations found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseModal;
