import { Link } from 'react-router-dom';
import DestinationDetails from '../data/DestinationAreas';

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to the Vacation Planner</h1>
      <ul className="grid gap-4">
        {DestinationDetails.map(dest => (
          <li key={dest.id} className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-semibold">{dest.name}</h2>
            <p className="text-gray-600">{dest.category}</p>
            <Link to={`/destination/${dest.id}`} className="text-blue-500 underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;