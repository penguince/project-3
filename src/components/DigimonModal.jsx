import { useState, useEffect } from 'react';
import './DigimonModal.css';

/**
 * DigimonModal Component
 * Displays detailed information about a selected Digimon in a modal
 * Fetches additional data from the API endpoint /api/digimon/name/:name
 * 
 * @param {Object} props
 * @param {Object} props.digimon - The selected Digimon object
 * @param {Function} props.onClose - Handler to close the modal
 */
function DigimonModal({ digimon, onClose }) {
  const [detailData, setDetailData] = useState(null);
  const [relatedDigimon, setRelatedDigimon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Fetch detailed data for the selected Digimon and related Digimon by level
  useEffect(() => {
    const fetchDigimonDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch individual Digimon data by name
        const nameResponse = await fetch(
          `https://digimon-api.vercel.app/api/digimon/name/${encodeURIComponent(digimon.name)}`
        );

        if (!nameResponse.ok) {
          throw new Error(`Failed to fetch Digimon details`);
        }

        const nameData = await nameResponse.json();
        setDetailData(nameData[0] || digimon);

        // Fetch related Digimon by level
        const levelResponse = await fetch(
          `https://digimon-api.vercel.app/api/digimon/level/${encodeURIComponent(digimon.level)}`
        );

        if (levelResponse.ok) {
          const levelData = await levelResponse.json();
          // Filter out current Digimon and get random 4 related ones
          const filtered = levelData
            .filter((d) => d.name !== digimon.name)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
          setRelatedDigimon(filtered);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching Digimon details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDigimonDetails();
  }, [digimon]);

  // Get level description
  const getLevelDescription = (level) => {
    const descriptions = {
      'Fresh': 'The earliest stage of Digimon evolution. These Digimon are newly born and very weak.',
      'In Training': 'Young Digimon that have evolved from Fresh level. Still developing their abilities.',
      'Training': 'Young Digimon in their training phase, developing basic combat skills.',
      'Rookie': 'Fully developed young Digimon. This is often the first battle-ready form.',
      'Champion': 'Adult-level Digimon with developed combat abilities and stronger attacks.',
      'Ultimate': 'Powerful Digimon that have achieved a high level of evolution.',
      'Mega': 'The highest natural evolution level. These Digimon possess immense power.',
      'Armor': 'Special Digimon that evolved using Digi-Eggs, gaining unique armor and abilities.'
    };
    return descriptions[level] || 'A powerful Digital Monster from the Digital World.';
  };

  // Handle click on backdrop to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {isLoading ? (
          <div className="modal-loading">
            <div className="modal-spinner"></div>
            <p>Loading Digimon data...</p>
          </div>
        ) : error ? (
          <div className="modal-error">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Main Digimon Info */}
            <div className="modal-main">
              <div className="modal-image-section">
                <div className="modal-image-container">
                  <img
                    src={detailData?.img || digimon.img}
                    alt={digimon.name}
                    className="modal-image"
                  />
                </div>
                <div className={`modal-level-badge level-${digimon.level.toLowerCase().replace(' ', '-')}`}>
                  {digimon.level}
                </div>
              </div>

              <div className="modal-info-section">
                <h2 className="modal-title">{digimon.name}</h2>
                
                <div className="modal-stats">
                  <div className="stat-item">
                    <span className="stat-label">Level</span>
                    <span className="stat-value">{digimon.level}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Type</span>
                    <span className="stat-value">Digital Monster</span>
                  </div>
                </div>

                <div className="modal-description">
                  <h3>About this Level</h3>
                  <p>{getLevelDescription(digimon.level)}</p>
                </div>

                <div className="modal-api-info">
                  <h3>API Endpoint</h3>
                  <code className="api-endpoint">
                    /api/digimon/name/{digimon.name.toLowerCase()}
                  </code>
                </div>
              </div>
            </div>

            {/* Related Digimon Section */}
            {relatedDigimon.length > 0 && (
              <div className="modal-related">
                <h3>Other {digimon.level} Level Digimon</h3>
                <div className="related-grid">
                  {relatedDigimon.map((related, index) => (
                    <div key={`${related.name}-${index}`} className="related-card">
                      <img src={related.img} alt={related.name} />
                      <span>{related.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DigimonModal;
