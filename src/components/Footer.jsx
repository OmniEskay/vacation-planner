import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Dream Vacation Planner</h3>
            <p className="text-gray-300">
              Discover the world's most amazing destinations and plan your dream trip today.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-white">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/my-trip" className="text-gray-300 hover:text-white">
                  My Trip
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              Have questions or suggestions?<br />
              Email us at: <a href="mailto:info@dreamvacation.com" className="hover:underline">info@dreamvacation.com</a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {year} Dream Vacation Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;