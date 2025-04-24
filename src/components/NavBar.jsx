import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? "bg-indigo-800 text-white"
        : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
    }`;

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-white text-2xl font-extrabold tracking-wide">
          Dream Vacation Planner
        </NavLink>

        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/explore" className={navLinkClasses}>Explore</NavLink>
          <NavLink to="/my-trip" className={navLinkClasses}>My Trip</NavLink>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-indigo-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={navLinkClasses} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/explore" className={navLinkClasses} onClick={toggleMenu}>Explore</NavLink>
          <NavLink to="/my-trip" className={navLinkClasses} onClick={toggleMenu}>My Trip</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;