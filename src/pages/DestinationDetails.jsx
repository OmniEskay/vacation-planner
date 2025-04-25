import { useParams } from 'react-router-dom';

const DestinationDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Destination Details</h1>
      <p>Viewing details for destination with ID: {id}</p>
    </div>
  );
};

export default DestinationDetails;