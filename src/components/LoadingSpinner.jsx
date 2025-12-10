import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Displays an animated loading indicator while data is being fetched
 * 
 * @param {Object} props
 * @param {string} props.message - Optional loading message to display
 */
function LoadingSpinner({ message = 'Loading Digimon...' }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="digimon-icon">🐉</div>
      </div>
      <p className="loading-message">{message}</p>
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
