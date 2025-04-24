import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Link } from 'react-router-dom';

const MyTrip = () => {
  const { tripItems, addDestination, removeDestination, clearTrip } = useTrip();

  const [newTrip, setNewTrip] = useState({
    name: "",
    category: "",
    description: "",
    images: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newTrip.images];
    updatedImages[index] = value;
    setNewTrip((prev) => ({ ...prev, images: updatedImages }));
  };

  const addImageField = () => {
    setNewTrip((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleAddTrip = (e) => {
    e.preventDefault();

    const cleanTrip = {
      ...newTrip,
      id: Date.now(), 
      image: newTrip.images[0] || "", 
      images: newTrip.images.filter((img) => img.trim() !== ""),
    };

    addDestination(cleanTrip);

    setNewTrip({ name: "", category: "", description: "", images: [""] });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Saved Trip</h1>

      {/* Add Trip Form */}
      <form onSubmit={handleAddTrip} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8 space-y-6">
  <h2 className="text-2xl font-semibold text-gray-800">Add a New Trip</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      name="name"
      value={newTrip.name}
      onChange={handleInputChange}
      placeholder="Trip Name"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
      required
    />
    <input
      type="text"
      name="category"
      value={newTrip.category}
      onChange={handleInputChange}
      placeholder="Category (e.g. Beach, Mountain)"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
      required
    />
  </div>

  <textarea
    name="description"
    value={newTrip.description}
    onChange={handleInputChange}
    placeholder="Description"
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
    rows={4}
    required
  />

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
    {newTrip.images.map((img, index) => (
      <input
        key={index}
        type="url"
        value={img}
        onChange={(e) => handleImageChange(index, e.target.value)}
        placeholder={`Image URL ${index + 1}`}
        className="w-full mb-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
      />
    ))}
    <button
      type="button"
      onClick={addImageField}
      className="mt-2 text-sm text-indigo-600 hover:underline"
    >
      + Add another image
    </button>
  </div>

  <div>
    <button
      type="submit"
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
    >
      Add Trip
    </button>
  </div>
</form>


      {/* Existing Trip Items Display */}
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{item.category}</p>
                  <p className="text-sm text-gray-500 mb-3 flex-grow">{item.description?.substring(0, 100)}{item.description?.length > 100 ? '...' : ''}</p>

                  <button
                    onClick={() => removeDestination(item.id)}
                    className="mt-auto bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-1 px-3 rounded text-sm"
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
