import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ destination, onSave, onBookNow }) => {
  const [isSaved, setIsSaved] = useState(false); 
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); 

  if (!destination || !destination.id || !destination.name) {
      console.error("Invalid destination data passed to DestinationCard:", destination);
      return <div className="destination-card error-card">Invalid Data</div>;
  }

  const primaryImage = destination.images && destination.images.length > 0
                       ? destination.images[0]
                       : 'placeholder.jpg';

  const rating = destination.rating || 0;
  const reviews = destination.reviews || 0;
  const price = destination.price ? `$${destination.price.toLocaleString()}` : '---';

  const handleSaveClick = (e) => {
    e.stopPropagation(); 
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    if (onSave) onSave(destination.id, newSavedState);
  };

  const handleBookNow = (e) => {
    e.stopPropagation(); 
    if (onBookNow) onBookNow(destination.id);
  };
  const handleCardClick = () => {
    navigate(`/destination/${destination.id}`);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation(); 
    handleCardClick(); 
  };

  return (
    <div
      className="destination-card" 
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View details for ${destination.name}`} 
      role="article" 
      tabIndex={0} 
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="card-image-container">
        <img
          src={primaryImage}
          alt={`${destination.name || 'Destination'} - ${destination.category || 'Category'}`} // Fallback alt text
          className="destination-image"
          loading="lazy" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'placeholder.jpg'; 
          }}
        />
        {destination.category && <span className="category-badge">{destination.category}</span>}
        <div className={`image-overlay ${isHovered ? 'visible' : ''}`}></div>
        <button
          className={`save-button ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? `Remove ${destination.name} from saved trips` : `Save ${destination.name} to trips`}
          title={isSaved ? 'Remove from saved trips' : 'Save to trips'} 
        >
          {isSaved ? (
            <>
              <span className="saved-icon" aria-hidden="true">✓</span> 
              {' '}Saved 
            </>
          ) : (
            <>
              <span className="save-icon" aria-hidden="true">+</span> 
              {' '}Save 
            </>
          )}
        </button>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="destination-name">{destination.name || 'Unnamed Destination'}</h3>
          <div className="price-tag" aria-label={`Price: ${price}`}>
            {price}
          </div>
        </div>

        <div className="rating-container" aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars based on ${reviews} reviews`}>
          <div className="stars" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              let starClass = 'star';
              if (starValue <= rating) {
                 starClass += ' filled'; 
              } else if (starValue - 0.5 <= rating) {
                 starClass += ' half-filled'; 
              } else {
                 starClass += ' empty';
              }
              const starCharacter = starValue <= Math.round(rating) ? '★' : '☆';
              return (
                <span key={`star-${i}-${destination.id}`} className={starClass} aria-hidden="true">
                  {starCharacter}
                </span>
              );
            })}
          </div>
          <div className="rating-details">
            <span className="rating-text">{rating.toFixed(1)}</span>
            <span className="review-count">({reviews} reviews)</span> 
          </div>
        </div>
        <p className="destination-description">{destination.description || 'No description provided.'}</p>
        <div className="action-buttons">
          <button
            className="book-now-button"
            onClick={handleBookNow}
            aria-label={`Book trip to ${destination.name || 'this destination'} now`}
          >
            Book Now
          </button>
          <button
            className="details-button"
            onClick={handleDetailsClick} // Use extracted handler
            aria-label={`View more details for ${destination.name || 'this destination'}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, 
    name: PropTypes.string.isRequired, 
    category: PropTypes.string, 
    description: PropTypes.string, 
    images: PropTypes.arrayOf(PropTypes.string), 
    price: PropTypes.number, 
    rating: PropTypes.number, 
    reviews: PropTypes.number, 
    location: PropTypes.string, 
    duration: PropTypes.string,
    bestSeason: PropTypes.string, 
  }).isRequired,
  onSave: PropTypes.func,
  onBookNow: PropTypes.func,
};

DestinationCard.defaultProps = {
  onSave: () => {}, 
  onBookNow: () => {}, 
  destination: {
      images: [],
      category: 'Uncategorized',
      description: 'No description available.',
      price: null,
      rating: 0,
      reviews: 0,
  }
};


export default DestinationCard;