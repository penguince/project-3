import './ErrorMessage.css';

/**
 * ErrorMessage Component
 * Displays a user-friendly error message with retry option
 * 
 * @param {Object} props
 * @param {string} props.message - The error message to display
 * @param {Function} props.onRetry - Callback function for retry button
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{message}</p>
      <div className="error-suggestions">
        <p>Possible causes:</p>
        <ul>
          <li>Network connection issues</li>
          <li>API server is temporarily unavailable</li>
          <li>Request timeout</li>
        </ul>
      </div>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          🔄 Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
