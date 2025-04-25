import React, { useState } from "react";
import destinationData from "../data/destinationData";
import DestinationCard from "../components/DestinationCard";

const Explore = () => {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Beach", "Mountain", "City", "Adventure"];

  const filteredDestinations =
    category === "All"
      ? destinationData
      : destinationData.filter(dest => dest.category === category);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Explore Dream Destinations
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            aria-label={`Filter by ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredDestinations.length === 0 ? (
        <p className="text-center text-gray-500">No destinations available in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Explore;
