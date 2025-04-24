import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/DestinationCard'; 
export default function HomePage() {
  const [allDestinations, setAllDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDestinations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/destinations");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllDestinations(data); 


      } catch (err) {
         console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDestinations();
  }, []);

  const featuredDestinations = allDestinations;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center p-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <h1 className="text-4xl font-bold mb-3">Welcome to Travel Explorer</h1>
          <p className="text-xl">Discover your next adventure.</p>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
              Featured Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore some of our most popular and breathtaking locations around the globe.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">

              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 bg-red-100 p-4 rounded-md">
              Error loading destinations: {error} <br/>
              Please ensure the JSON server is running (e.g., npx json-server --watch db.json --port 3000).
            </div>
          ) : featuredDestinations.length === 0 ? (
            <p className="text-center text-gray-500">No featured destinations available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {featuredDestinations.map(destination => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}

                  />
              ))}
            </div>
          )}

        </div>
      </div>


    </div>
  );
}