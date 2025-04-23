import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './DestinationCard.css';

const DestinationCard = ({ destination, onSave, onBookNow }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const primaryImage = destination.images[0];

   
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

  return (
    <div 
      className="destination-card" 
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View details for ${destination.name}`}
      role="article"
    >
      
      <div className="card-image-container">
        <img 
          src={primaryImage} 
          alt={`${destination.name} - ${destination.category}`}
          className="destination-image"
          loading="lazy"
        />
        <span className="category-badge">{destination.category}</span>
        
        <div className={`image-overlay ${isHovered ? 'visible' : ''}`}></div>
        
        <button 
          className={`save-button ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? 'Remove from saved trips' : 'Save to trips'}
        >
          {isSaved ? (
            <span className="saved-icon">✓</span>
          ) : (
            <span className="save-icon">+</span>
          )}
          {isSaved ? ' Saved' : ' Save'}
        </button>
      </div>

      
      <div className="card-content">
        <div className="card-header">
          <h3 className="destination-name">{destination.name}</h3>
          <div className="price-tag" aria-label={`Price: ${price}`}>
            {price}
          </div>
        </div>

        
        <div className="rating-container" aria-label={`Rating: ${rating} out of 5`}>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span 
                key={`star-${i}`}
                className={`star ${i < Math.floor(rating) ? 'filled' : ''} ${
                  i === Math.floor(rating) && rating % 1 > 0 ? 'half-filled' : ''
                }`}
              >
                {i < Math.floor(rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <div className="rating-details">
            <span className="rating-text">{rating.toFixed(1)}</span>
            <span className="review-count">({reviews} reviews)</span>
          </div>
        </div>

        <p className="destination-description">{destination.description}</p>
        
       
        <div className="action-buttons">
          <button 
            className="book-now-button"
            onClick={handleBookNow}
            aria-label={`Book trip to ${destination.name}`}
          >
            Book Now
          </button>
          <button 
            className="details-button"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            aria-label={`View details for ${destination.name}`}
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
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
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
};

export default DestinationCard;