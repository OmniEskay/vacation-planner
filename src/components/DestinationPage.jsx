import React from 'react';

import { useState } from 'react';
import {useParams} from 'react-router-dom';

function DestinationPage() {
    const { id } = useParams();// get destination id from url
    const destinationId= parseInt(id, 10); // convert id to number
    const selectedDestination = destinationsData.find(dest => dest.id ===destinationId);//find destination
    
    const [tripList, setTripList] = useState([]); // state to store trip list
      
  //function to handle adding or removing destination to/from trip
const handleTripToggle = () => {
    if (tripList.includes (destinationId)) {
        setTripList(tripList.filter(dest => dest !== destinationId)); // remove destination from trip
    }else {
        setTripList([...tripList, destinationId]); // add destination to trip
    }
const isInTripList= tripList.includes(destinationId); // check if destination is in trip list
if (!selectedDestination) {
    return(
<div className= "min-h-screen flex items-center justify-center txt-xl text-blue-500">
    Destination not found
</div>
    );
}

return (
    <div className = "min-h screen bg-gray-100 p-6></div">
        <div className= "max-w-4xl mx-auto bg-white rounded-xl shadow md p-6">
            <h1 className= "text-4xl font-bold text-blue-700 mb-3">
                {selectedDestination.name}
            </h1>
            <p className= "text-lg text-gray-600 italic mb-4">
                {selectedDestination.country}

            </p>
            <img
            src={selectedDestination.imageUrl}
            alt={selectedDestination.name}
            className= "w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className= "test-gray-700 text-base leading relaxed mb-4">
                {selectedDestination.description}
            </p>
            <p className= "text-gray-800 font-semibold">cost: ${selectedDestination.cost}</p>
            <p className= "text-gray-800 font-semibold"> 
                Location: {selectedDestination.location}
            </p>
            

        </div>
    </div>
)
};

}
export default DestinationPage;
