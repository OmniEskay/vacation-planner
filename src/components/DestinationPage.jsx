import React from "react";
import React, { useState } from "react"

function DestinationPage() {
    const [selectDestination, setSelectedDestination] = useState(null);

    const handleDestinationClick = (destination);

    setSelectedDestination(destination);{

    };
    return (
        <div className= "min-h-screen bg-gray-50 p-4">

         <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
            

            </h1> 
             <div className= "grid grid-cols-1 md:grid-cols-3 gap-4">
                //list of destinations
                <div className="col-span-1">
                    <h2 className = "text - 2xl font-semibold mb-4 text-gray-800">
                        Available Destinations
                    </h2>
                </div>
                </div> 
        </div>
    )
}

export default DestinationPage;




