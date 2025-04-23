import React from 'react';

import { useState } from 'react';
import {useParams} from 'react-router-dom';

function DestinationPage() {
    const { id } = useParams();// get destination id from url
    const destinationId= parseInt(id, 10); // convert id to number
    const selectedDestination = destinationsData.find(dest => dest.id ===destinationId);//find destination
    
    const [tripList, setTripList] = useState([]); // state to store trip list
    
}
