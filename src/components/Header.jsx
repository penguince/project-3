import './Header.css';

/**
 * Header Component
 * Displays the application header with title and description
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <span className="logo-emoji">🦖</span>
          <h1 className="app-title">Digimon Explorer</h1>
          <span className="logo-emoji">🐉</span>
        </div>
        <p className="app-description">
          Discover and explore the Digital Monsters from the Digimon universe! 
          Search by name or filter by evolution level.
        </p>
        <div className="header-badges">
          <span className="badge">209+ Digimon</span>
          <span className="badge">All Levels</span>
          <span className="badge">Live API</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
