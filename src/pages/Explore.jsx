import React from "react";
import destinationData from "../data/destinationData";
import DestinationCard from "../components/DestinationCard"; 


const Explore = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
  <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
    Explore Dream Destinations
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {destinationData.map((destination) => (
      <DestinationCard key={destination.id} destination={destination} />
    ))}
  </div>
</main>

  );
};

export default Explore;
