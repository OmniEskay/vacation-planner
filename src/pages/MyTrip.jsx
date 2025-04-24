import React from 'react';
import { useTrip } from '../context/TripContext'; 
import { Link } from 'react-router-dom';

const MyTrip = () => {
  const { tripItems, removeDestination, clearTrip } = useTrip();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Saved Trip</h1>

      {tripItems.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow">
          <p className="text-xl text-gray-600 mb-4">Your trip itinerary is currently empty.</p>
          <p className="text-gray-500 mb-6">Start adding destinations to plan your next adventure!</p>
          <Link
            to="/explore"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Explore Destinations
          </Link>
        </div>
      ) : (
        <div>
          <div className="text-right mb-4">
             <button
                onClick={clearTrip}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300 text-sm"
                aria-label="Clear all items from trip"
              >
                Clear Entire Trip
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                 <img
                    src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={`Image of ${item.name}`}
                    className="w-full h-48 object-cover" 
                 />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name || 'Unnamed Destination'}</h3>
                  {item.location && <p className="text-sm text-gray-600 mb-1">{item.location}</p>}
                  {item.description && <p className="text-sm text-gray-500 mb-3 flex-grow">{item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}</p>}

                   <Link
                        to={`/destination/${item.id}`}
                        className="text-blue-600 hover:underline text-sm mb-3 mt-auto"
                    >
                       View Details
                   </Link>

                   <button
                      onClick={() => removeDestination(item.id)}
                      className="mt-auto bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-1 px-3 rounded transition duration-300 text-sm self-start" // Aligned to bottom-left
                      aria-label={`Remove ${item.name} from trip`}
                   >
                      Remove
                   </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrip;