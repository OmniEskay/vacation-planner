// src/components/NavBar.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold">
              Dream Vacation Planner
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-medium border-b-2 border-white"
                  : "hover:text-blue-200"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive
                  ? "font-medium border-b-2 border-white"
                  : "hover:text-blue-200"
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/my-trip"
              className={({ isActive }) =>
                isActive
                  ? "font-medium border-b-2 border-white"
                  : "hover:text-blue-200"
              }
            >
              My Trip
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium border-l-4 pl-2 border-white"
                    : "hover:text-blue-200 pl-3"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium border-l-4 pl-2 border-white"
                    : "hover:text-blue-200 pl-3"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </NavLink>
              <NavLink
                to="/my-trip"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium border-l-4 pl-2 border-white"
                    : "hover:text-blue-200 pl-3"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                My Trip
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;