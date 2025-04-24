import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Link } from 'react-router-dom';

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Other"];

const MyTrip = () => {
  const { tripItems, removeDestination, clearTrip } = useTrip();
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]);   const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState(''); 
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const handleFormSubmit = async (event) => {
    event.preventDefault(); 

    if (!formName.trim() || !formDescription.trim() || !formCategory) {
      setFormError('Please fill in all required fields (Name, Category, Description).');
      setFormSuccessMessage('');
      return;
    }

    setFormIsLoading(true);
    setFormError(null);
    setFormSuccessMessage('');

    const newDestination = {
      name: formName.trim(),
      category: formCategory,
      description: formDescription.trim(),
      images: formImageUrl.trim() ? [formImageUrl.trim()] : [],
    };

    try {
      const response = await fetch('http://localhost:3000/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDestination),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`HTTP error! status: ${response.status} - ${errorData?.message || 'Failed to add destination'}`);
      }

      const addedDestination = await response.json();
      setFormSuccessMessage(`Successfully added "${addedDestination.name}"!`);

      setFormName('');
      setFormCategory(categories[0]);
      setFormDescription('');
      setFormImageUrl('');

    } catch (err) {
      console.error("Submission error:", err);
      setFormError(err.message || 'An unexpected error occurred. Please try again.');
      setFormSuccessMessage('');
    } finally {
      setFormIsLoading(false);
    }
  };

  const imageErrorHandler = (e) => {
      e.target.onerror = null;
      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">My Saved Trip</h1>
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
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200">
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={`Image of ${item.name}`}
                    className="w-full h-48 object-cover"
                    onError={imageErrorHandler}
                   />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name || 'Unnamed Destination'}</h3>
                    {item.category && <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{item.category}</p>}
                    {item.description && <p className="text-sm text-gray-600 mb-3 flex-grow">{item.description.substring(0, 80)}{item.description.length > 80 ? '...' : ''}</p>}

                    <Link
                      to={`/destinations/${item.id}`}
                      className="text-blue-600 hover:underline text-sm mb-3 mt-auto pt-2"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeDestination(item.id)}
                      className="mt-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-1 px-3 rounded transition duration-300 text-sm self-start"
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
      <hr className="my-12 border-t-2 border-gray-200" />
      <section>
         <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Add a New Destination to Database</h2>
         <form onSubmit={handleFormSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-6 max-w-2xl mx-auto">
            <div>
              <label htmlFor="form-name" className="block text-sm font-medium text-gray-700 mb-1">
                Destination Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="form-name" 
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="e.g., Great Wall of China"
              />
            </div>
            <div>
              <label htmlFor="form-category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="form-category"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="form-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="form-description"
                rows="4"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Describe the destination..."
              />
            </div>
            <div>
              <label htmlFor="form-imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Image URL (Optional)
              </label>
              <input
                type="url"
                id="form-imageUrl"
                value={formImageUrl}
                onChange={(e) => setFormImageUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the full URL for one representative image.</p>
            </div>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{formError}</span>
              </div>
            )}
            {formSuccessMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success: </strong>
                <span className="block sm:inline">{formSuccessMessage}</span>
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={formIsLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 ease-in-out ${
                  formIsLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {formIsLoading ? 'Submitting...' : 'Add Destination to Database'}
              </button>
            </div>
          </form>
      </section>
    </div>
  );
};

export default MyTrip;