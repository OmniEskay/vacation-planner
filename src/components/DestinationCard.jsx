import React, { useState, useEffect } from "react";
import destinationData from "../../public/data/destinationData"; 
import DestinationCard from "../components/DestinationCard"; 

const Explore = () => {
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
      const uniqueCategories = [...new Set(destinationData.map(dest => dest.category).filter(Boolean))];
      setCategories(["All", ...uniqueCategories]);
  }, []);

  const filteredDestinations =
    category === "All"
      ? destinationData 
      : destinationData.filter(dest => dest.category === category); 
  const handleSave = (id, savedState) => {
      console.log(`Destination ${id} saved state: ${savedState}`);
  };

  const handleBook = (id) => {
      console.log(`Booking destination ${id}`);
  };


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
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              category === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            aria-pressed={category === cat}
            aria-label={`Filter destinations by ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>
      {filteredDestinations.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No destinations found for the selected category "{category}".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard
                key={destination.id}
                destination={destination}
                onSave={handleSave}
                onBookNow={handleBook}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Explore;