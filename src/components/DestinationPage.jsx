import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DestinationDetails from '../data/DestinationDetails'; // import destination details

function DestinationPage() {
    const { id } = useParams(); // get destination id from URL
    const destinationId = parseInt(id, 10); // convert id to number
    const selectedDestination = DestinationDetails.find(dest => dest.id === destinationId); // find destination

    const [tripList, setTripList] = useState(() => {
        // Load saved trip list from localStorage if it exists
        const savedTrips = localStorage.getItem('tripList');
        return savedTrips ? JSON.parse(savedTrips) : [];
    });

    // Save trip list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('tripList', JSON.stringify(tripList));
    }, [tripList]);

    // Function to handle adding or removing destination to/from trip
    const handleTripToggle = () => {
        if (tripList.includes(destinationId)) {
            setTripList(tripList.filter(dest => dest !== destinationId)); // remove destination from trip
        } else {
            setTripList([...tripList, destinationId]); // add destination to trip
        }
    };

    const isInTripList = tripList.includes(destinationId); // check if destination is in trip list

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
                    {selectedDestination.country}
                </p>
                <img
                    src={selectedDestination.imageUrl}
                    alt={selectedDestination.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                    {selectedDestination.description}
                </p>
                <p className="text-gray-800 font-semibold">Cost: ${selectedDestination.cost}</p>
                <p className="text-gray-800 font-semibold mb-4">
                    Location: {selectedDestination.location}
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
        </div>
    );
}

export default DestinationPage;