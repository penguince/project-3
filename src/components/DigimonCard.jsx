import './DigimonCard.css';

/**
 * DigimonCard Component
 * A reusable card component that displays individual Digimon information
 * Clicking on the card opens a modal with more details
 * 
 * @param {Object} props
 * @param {string} props.name - The name of the Digimon
 * @param {string} props.img - The image URL of the Digimon
 * @param {string} props.level - The evolution level of the Digimon
 * @param {Function} props.onClick - Handler for card click
 */
function DigimonCard({ name, img, level, onClick }) {
  // Determine the color class based on the Digimon's level
  const getLevelClass = (level) => {
    const levelClasses = {
      'Fresh': 'level-fresh',
      'In Training': 'level-training',
      'Training': 'level-training',
      'Rookie': 'level-rookie',
      'Champion': 'level-champion',
      'Ultimate': 'level-ultimate',
      'Mega': 'level-mega',
      'Armor': 'level-armor'
    };
    return levelClasses[level] || 'level-default';
  };

  // Handle keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div 
      className="digimon-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${name}, ${level} level Digimon`}
    >
      <div className="card-image-container">
        <img 
          src={img} 
          alt={`${name} - ${level} level Digimon`}
          className="digimon-image"
          loading="lazy"
        />
        <div className="card-overlay">
          <span className="view-details">Click to view details</span>
        </div>
      </div>
      <div className="card-content">
        <h3 className="digimon-name">{name}</h3>
        <span className={`digimon-level ${getLevelClass(level)}`}>
          {level}
        </span>
      </div>
    </div>
  );
}

export default DigimonCard;
