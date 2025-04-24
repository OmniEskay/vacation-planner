import React from 'react';
import { useTrip } from '../context/TripContext'; // Assuming context setup
import { Link } from 'react-router-dom';
import AddDestinationForm from './AddDestinationForm'; // Adjust path if necessary

const MyTrip = () => {
  const { tripItems, removeDestination, clearTrip } = useTrip();

  // Helper function for image errors, similar to DestinationPage
  const imageErrorHandler = (e) => {
      e.target.onerror = null; // prevent loops
      e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; // Use a consistent placeholder
  };


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section: My Saved Trip */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">My Saved Trip</h1>

        {tripItems.length === 0 ? (
          // Display when the trip is empty
          <div className="text-center py-10 bg-gray-50 rounded-lg shadow">
            <p className="text-xl text-gray-600 mb-4">Your trip itinerary is currently empty.</p>
            <p className="text-gray-500 mb-6">Start adding destinations to plan your next adventure!</p>
            <Link
              to="/explore" // Link to the page where users can browse destinations
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          // Display when there are items in the trip
          <div>
            <div className="text-right mb-4">
              <button
                onClick={clearTrip} // Button to clear all items
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300 text-sm"
                aria-label="Clear all items from trip"
              >
                Clear Entire Trip
              </button>
            </div>

            {/* Grid display for trip items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripItems.map((item) => (
                // Card for each item in the trip
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200">
                  <img
                    // Use the first image from the images array, or a default/placeholder
                    src={item.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={`Image of ${item.name}`}
                    className="w-full h-48 object-cover"
                    onError={imageErrorHandler} // Use the error handler
                   />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name || 'Unnamed Destination'}</h3>
                    {/* Display category if available */}
                    {item.category && <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{item.category}</p>}
                    {/* Display truncated description */}
                    {item.description && <p className="text-sm text-gray-600 mb-3 flex-grow">{item.description.substring(0, 80)}{item.description.length > 80 ? '...' : ''}</p>}

                    {/* Link to view full details */}
                    <Link
                      to={`/destinations/${item.id}`} // Corrected path assuming '/destinations/:id' route
                      className="text-blue-600 hover:underline text-sm mb-3 mt-auto pt-2" // Added padding-top
                    >
                      View Details
                    </Link>

                    {/* Button to remove item from trip */}
                    <button
                      onClick={() => removeDestination(item.id)}
                      className="mt-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-1 px-3 rounded transition duration-300 text-sm self-start" // Aligned to bottom-left
                      aria-label={`Remove ${item.name} from trip`}
                    >
                      Remove from Trip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* --- Divider --- */}
      <hr className="my-12 border-t-2 border-gray-200" />

      {/* Section: Add New Destination to Database */}
      <section>
         <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Add a New Destination to Database</h2>
         {/* Render the imported form component */}
         <AddDestinationForm />
      </section>

    </div>
  );
};

export default MyTrip;