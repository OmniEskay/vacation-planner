import { useState, useEffect } from 'react';

const DestinationCard = ({ destination, onDetailsClick }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="h-48 bg-gray-300 relative">
      <img 
        src={destination.imageUrl || "/api/placeholder/300/200"} 
        alt={destination.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4">
        <h3 className="text-white font-bold text-xl">{destination.name}</h3>
        <p className="text-white/90 text-sm">{destination.country}</p>
      </div>
    </div>
    <div className="p-4">
      <p className="text-gray-700 mb-2 line-clamp-2">{destination.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-indigo-600 font-semibold">Ksh {destination.price}</span>
        <button 
          onClick={() => onDetailsClick(destination.id)} 
          className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
        >
          See Details
        </button>
      </div>
    </div>
  </div>
);

export default function HomePage() {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setFeaturedDestinations([
        {
          id: 1,
          name: "Bali",
          country: "Indonesia",
          description: "Tropical paradise with beautiful beaches and vibrant culture.",
          price: 140000,
          imageUrl: "/api/placeholder/400/300"
        },
        {
          id: 2,
          name: "Paris",
          country: "France",
          description: "The city of love with iconic landmarks and exquisite cuisine.",
          price: 180000,
          imageUrl: "/api/placeholder/400/300"
        },
        {
          id: 3,
          name: "Tokyo",
          country: "Japan",
          description: "Blend of traditional culture and ultramodern attractions.",
          price: 220000,
          imageUrl: "/api/placeholder/400/300"
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  const handleDetailsClick = (id) => {
    console.log(`Navigate to destination details: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gray-900">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: "url('/api/placeholder/1200/600')",
          opacity: 0.6
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Plan Your Dream Vacation
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Discover amazing destinations and create unforgettable memories
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => handleNavigation('/explore')} 
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
            >
              Explore Destinations
            </button>
            <button 
              onClick={() => handleNavigation('/my-trips')} 
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition"
            >
              My Trips
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Plan Your Perfect Getaway</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our vacation planner makes it easy to discover new destinations, save your favorites,
            and organize your dream trips all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-gray-600">
              Browse through hundreds of handpicked destinations from around the world.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Save</h3>
            <p className="text-gray-600">
              Keep track of your favorite places and create a personalized travel wishlist.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Plan</h3>
            <p className="text-gray-600">
              Organize your trips with our intuitive planning tools and itinerary builder.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our top picks for your next adventure
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map(destination => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination} 
                  onDetailsClick={handleDetailsClick}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button 
              onClick={() => handleNavigation('/explore')} 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View All Destinations
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-indigo-700 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:py-16 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-2">Ready to start planning?</h2>
              <p className="text-indigo-100 text-lg">
                Create your account today and begin organizing your dream vacation.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <button 
                onClick={() => handleNavigation('/register')} 
                className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}