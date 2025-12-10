import { useState, useEffect, useMemo } from 'react';
import {
  Header,
  SearchBar,
  DigimonGrid,
  DigimonModal,
  LoadingSpinner,
  ErrorMessage
} from './components';
import './App.css';

// API endpoint for fetching Digimon data
const API_URL = 'https://digimon-api.vercel.app/api/digimon';

/**
 * App Component
 * Main application component that manages state and data fetching
 * Demonstrates useEffect for API calls, loading/error states, and filtering
 */
function App() {
  // State for storing fetched Digimon data
  const [digimon, setDigimon] = useState([]);
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true);
  
  // State for error handling
  const [error, setError] = useState(null);
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for level filter
  const [selectedLevel, setSelectedLevel] = useState('');

  // State for selected Digimon (for modal)
  const [selectedDigimon, setSelectedDigimon] = useState(null);

  /**
   * Fetches Digimon data from the external API
   * Handles loading and error states appropriately
   */
  const fetchDigimon = async () => {
    // Reset states before fetching
    setIsLoading(true);
    setError(null);

    try {
      // Make the API request
      const response = await fetch(API_URL);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Validate that we received an array
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from API');
      }

      // Update state with fetched data
      setDigimon(data);
    } catch (err) {
      // Handle different types of errors
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError(err.message || 'Failed to fetch Digimon data. Please try again.');
      }
      console.error('Error fetching Digimon:', err);
    } finally {
      // Always set loading to false when done
      setIsLoading(false);
    }
  };

  /**
   * useEffect Hook - Fetches data when component mounts
   * Empty dependency array ensures this runs only once on mount
   */
  useEffect(() => {
    fetchDigimon();
  }, []);

  /**
   * Get unique levels from the Digimon data for the filter dropdown
   * useMemo optimizes this calculation to only run when digimon changes
   */
  const availableLevels = useMemo(() => {
    const levels = [...new Set(digimon.map((mon) => mon.level))];
    // Sort levels in a logical order
    const levelOrder = ['Fresh', 'In Training', 'Training', 'Rookie', 'Champion', 'Ultimate', 'Mega', 'Armor'];
    return levels.sort((a, b) => {
      const indexA = levelOrder.indexOf(a);
      const indexB = levelOrder.indexOf(b);
      // If level is not in our predefined order, put it at the end
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });
  }, [digimon]);

  /**
   * Filter Digimon based on search term and selected level
   * useMemo ensures filtering only recalculates when dependencies change
   */
  const filteredDigimon = useMemo(() => {
    return digimon.filter((mon) => {
      // Filter by search term (case-insensitive)
      const matchesSearch = mon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      // Filter by level (if selected)
      const matchesLevel = selectedLevel === '' || mon.level === selectedLevel;

      return matchesSearch && matchesLevel;
    });
  }, [digimon, searchTerm, selectedLevel]);

  /**
   * Handler for search input changes
   * @param {string} value - New search term
   */
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  /**
   * Handler for level filter changes
   * @param {string} value - Selected level
   */
  const handleLevelChange = (value) => {
    setSelectedLevel(value);
  };

  /**
   * Handler for retry button - refetches data
   */
  const handleRetry = () => {
    fetchDigimon();
  };

  /**
   * Handler for Digimon card click - opens modal with details
   * @param {Object} digimon - Selected Digimon object
   */
  const handleDigimonClick = (digimon) => {
    setSelectedDigimon(digimon);
  };

  /**
   * Handler for closing the modal
   */
  const handleCloseModal = () => {
    setSelectedDigimon(null);
  };

  return (
    <div className="app">
      {/* Header Section */}
      <Header />

      <main className="main-content">
        {/* Conditional Rendering based on app state */}
        
        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Fetching Digimon data..." />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Success State - Show search and grid */}
        {!isLoading && !error && (
          <>
            {/* Search and Filter Controls */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              selectedLevel={selectedLevel}
              onLevelChange={handleLevelChange}
              levels={availableLevels}
            />

            {/* Digimon Grid */}
            <DigimonGrid
              digimon={filteredDigimon}
              totalCount={digimon.length}
              onDigimonClick={handleDigimonClick}
            />
          </>
        )}
      </main>

      {/* Digimon Detail Modal */}
      {selectedDigimon && (
        <DigimonModal
          digimon={selectedDigimon}
          onClose={handleCloseModal}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          Built with React ⚛️ | Data from{' '}
          <a
            href="https://digimon-api.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Digimon API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
