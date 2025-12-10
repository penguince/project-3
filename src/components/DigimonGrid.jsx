import DigimonCard from './DigimonCard';
import './DigimonGrid.css';

/**
 * DigimonGrid Component
 * Displays a grid of DigimonCard components with results count
 * 
 * @param {Object} props
 * @param {Array} props.digimon - Array of Digimon objects to display
 * @param {number} props.totalCount - Total number of Digimon before filtering
 * @param {Function} props.onDigimonClick - Handler when a Digimon card is clicked
 */
function DigimonGrid({ digimon, totalCount, onDigimonClick }) {
  // Handle case when no results match the search/filter
  if (digimon.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No Digimon Found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid-container">
      {/* Results Count */}
      <div className="results-info">
        <p>
          Showing <span className="highlight">{digimon.length}</span> of{' '}
          <span className="highlight">{totalCount}</span> Digimon
        </p>
      </div>

      {/* Digimon Cards Grid */}
      <div className="digimon-grid">
        {digimon.map((mon, index) => (
          <DigimonCard
            key={`${mon.name}-${index}`}
            name={mon.name}
            img={mon.img}
            level={mon.level}
            onClick={() => onDigimonClick(mon)}
          />
        ))}
      </div>
    </div>
  );
}

export default DigimonGrid;
