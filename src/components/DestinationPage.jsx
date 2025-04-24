import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DestinationDetails from '../data/DestinationAreas';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DestinationPage() {
  const { id } = useParams();
  const destinationId = parseInt(id, 10);
  const selectedDestination = DestinationDetails.find(dest => dest.id === destinationId);

  const [tripList, setTripList] = useState(() => {
    try {
      const savedTrips = localStorage.getItem('tripList');
      return savedTrips ? JSON.parse(savedTrips) : [];
    } catch (error) {
      console.error("Error parsing tripList from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tripList', JSON.stringify(tripList));
  }, [tripList]);

  const handleTripToggle = () => {
    if (tripList.includes(destinationId)) {
      setTripList(tripList.filter(dest => dest !== destinationId));
      toast.info(`${selectedDestination.name} removed from trip`);
    } else {
      setTripList([...tripList, destinationId]);
      toast.success(`${selectedDestination.name} added to trip`);
    }
  };

  const isInTripList = tripList.includes(destinationId);

  if (!selectedDestination) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-500">
        Destination not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">
          {selectedDestination.name}
        </h1>
        <p className="text-lg text-gray-600 italic mb-4">
          {selectedDestination.category}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {selectedDestination.images?.slice(0, 4).map((img, index) => (
            <div key={index} className="aspect-video overflow-hidden rounded-md">
              <img
                src={img}
                alt={`${selectedDestination.name} ${index + 1}`}
                className="w-full h-48 object-cover rounded-md"
                onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
              />
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-base leading-relaxed mb-4">
          {selectedDestination.description}
        </p>

        <button
          onClick={handleTripToggle}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            isInTripList
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isInTripList ? 'Remove from Trip' : 'Add to Trip'}
        </button>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default DestinationPage;
