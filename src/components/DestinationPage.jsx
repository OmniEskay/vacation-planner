import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DestinationPage() {
  const { id } = useParams();
  const destinationId = parseInt(id, 10); 
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [tripList, setTripList] = useState(() => {
    try {
      const savedTrips = localStorage.getItem('tripList');
      return savedTrips ? JSON.parse(savedTrips) : [];
    } catch (parseError) {
      console.error("Error parsing tripList from localStorage:", parseError);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tripList', JSON.stringify(tripList));
  }, [tripList]);

  // Fetch single destination data
  useEffect(() => {
    if (isNaN(destinationId)) {
        setError("Invalid Destination ID.");
        setLoading(false);
        return;
    }

    const fetchDestination = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the specific destination using its ID
        const response = await fetch(`http://localhost:3000/destinations/${destinationId}`);
        if (!response.ok) {
           if (response.status === 404) {
             // Handle not found specifically if needed
             throw new Error(`Destination with ID ${destinationId} not found.`);
           }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedDestination(data); 
      } catch (err) {
         console.error("Fetch error:", err); 
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]); 

  // Trip List toggle logic 
  const handleTripToggle = () => {
    if (selectedDestination) {
      if (tripList.includes(selectedDestination.id)) {
        setTripList(tripList.filter(destId => destId !== selectedDestination.id));
      } else {
        setTripList([...tripList, selectedDestination.id]);
      }
    }
  };

  const isInTripList = selectedDestination && tripList.includes(selectedDestination.id);

  // Render states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-500">
        Loading destination details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500 p-4 text-center">
        Error loading destination: {error}
      </div>
    );
  }

  if (!selectedDestination) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-500">
        Destination not found.
      </div>
    );
  }

  const imageErrorHandler = (e) => {
      e.target.onerror = null; 
      e.target.src = "https://via.placeholder.com/400x300"; 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
         {/* Optional: Display the first image prominently */}
         {selectedDestination.images?.[0] && (
            <img
                src={selectedDestination.images[0]}
                alt={`${selectedDestination.name} main`}
                className="w-full h-64 md:h-96 object-cover"
                onError={imageErrorHandler}
            />
         )}
         <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2">
              {selectedDestination.name}
            </h1>
            <p className="text-lg text-gray-600 italic mb-4">
              Category: {selectedDestination.category}
            </p>

            {/* Image Gallery - Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
              {selectedDestination.images?.map((img, index) => (
                <img
                  key={index}
                  // Use direct path from db.json
                  src={img}
                  alt={`${selectedDestination.name} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md shadow hover:shadow-lg transition-shadow duration-200"
                  onError={imageErrorHandler} 
                  loading="lazy"
                />
              ))}
            </div>

            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {selectedDestination.description}
            </p>

            <button
              onClick={handleTripToggle}
              className={`px-5 py-2 rounded-lg font-semibold transition duration-200 ease-in-out ${
                isInTripList
                  ? 'bg-red-100 text-red-700 hover:bg-red-200 ring-1 ring-red-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isInTripList ? 'Remove from My Trip' : 'Add to My Trip'}
            </button>
         </div>
      </div>
    </div>
  );
}

export default DestinationPage;