import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast'; 


const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripItems, setTripItems] = useState(() => {
    try {
      const savedTrip = localStorage.getItem('myTrip');
      return savedTrip ? JSON.parse(savedTrip) : [];
    } catch (error) {
      console.error("Failed to parse trip from localStorage", error);
      return []; 
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('myTrip', JSON.stringify(tripItems));
    } catch (error) {
      console.error("Failed to save trip to localStorage", error);
    }
  }, [tripItems]);


  const addDestination = (destination) => {
    if (!destination) {
      console.error("Attempted to add invalid destination:", destination);
      toast.error("Could not add destination: Invalid data.");
      return;
    }
  
    // Assign a fallback ID if none exists
    const destinationWithId = {
      ...destination,
      id: destination.id ?? Date.now()
    };
  
    setTripItems(prevItems => {
      const isAlreadyInTrip = prevItems.some(item => item.id === destinationWithId.id);
  
      if (isAlreadyInTrip) {
        toast.error(`${destinationWithId.name || 'Destination'} is already in your trip!`);
        return prevItems;
      }
  
      toast.success(`${destinationWithId.name || 'Destination'} added to your trip!`);
      return [...prevItems, destinationWithId];
    });
  };

  const removeDestination = (destinationId) => {
    setTripItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === destinationId);
      const updatedItems = prevItems.filter(item => item.id !== destinationId);
      if (itemToRemove) {
        toast.success(`${itemToRemove.name || 'Destination'} removed from your trip.`);
      }
      return updatedItems;
    });
  };

  const clearTrip = () => {
    if (tripItems.length > 0) {
        setTripItems([]); 
        toast.success("Your trip has been cleared.");
    } else {
        toast("Your trip is already empty.", { icon: 'ℹ️' });
    }
  };

  return (
    <TripContext.Provider value={{ tripItems, addDestination, removeDestination, clearTrip }}>
      {children}
    </TripContext.Provider>
  );
};


export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};


export default TripContext;