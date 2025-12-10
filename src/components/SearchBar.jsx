import './SearchBar.css';

/**
 * SearchBar Component
 * Provides search and filter functionality for the Digimon list
 * 
 * @param {Object} props
 * @param {string} props.searchTerm - Current search term
 * @param {Function} props.onSearchChange - Handler for search input changes
 * @param {string} props.selectedLevel - Currently selected level filter
 * @param {Function} props.onLevelChange - Handler for level filter changes
 * @param {string[]} props.levels - Available levels for filtering
 */
function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  selectedLevel, 
  onLevelChange, 
  levels 
}) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        {/* Search Input */}
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search Digimon by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
            aria-label="Search Digimon by name"
          />
          {searchTerm && (
            <button 
              className="clear-button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Level Filter Dropdown */}
        <div className="filter-container">
          <label htmlFor="level-filter" className="filter-label">
            Filter by Level:
          </label>
          <select
            id="level-filter"
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            className="level-select"
            aria-label="Filter by Digimon level"
          >
            <option value="">All Levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
