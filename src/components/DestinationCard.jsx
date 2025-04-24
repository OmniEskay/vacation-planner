import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Assuming this component is used within a Router context
const DestinationCard = ({ destination }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Use the image path directly if assets are in the /public folder
  // Vite serves /public content from the root URL path ('/')
  const imageSrc = destination.images?.[0] || "https://via.placeholder.com/400x300"; // Default placeholder

  const handleDetailsClick = () => {
    if (destination?.id) {
      navigate(`/destinations/${destination.id}`); // Navigate to the details page
    } else {
      console.error("Destination ID is missing, cannot navigate.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
      <div className="relative h-48 flex-shrink-0">
        <img
          src={imageSrc} // Use the direct path or placeholder
          alt={destination.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if placeholder fails
            e.target.src = "https://via.placeholder.com/400x300";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-white text-xl font-bold drop-shadow-md">{destination.name}</h3>
          {/* Assuming country might be added later */}
          {/* {destination.country && <p className="text-white/90 text-sm">{destination.country}</p>} */}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">{destination.description}</p>
        <div className="mt-auto flex justify-between items-center pt-2">
          {/* Price display logic remains, though price isn't in current db.json */}
          {destination.price !== undefined ? (
            <span className="text-indigo-600 font-bold">
              Ksh {destination.price?.toLocaleString()}
            </span>
          ) : (
            <span className="text-gray-500 text-sm">Price N/A</span>
          )}
          <button
            onClick={handleDetailsClick} // Use the navigation handler
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;