import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center ml-4">
              <span className="text-white text-xl font-bold">Dream Vacation Planner</span>
            </Link>
          </div>
          <div className="flex items-center mr-4">
            <div className="hidden md:flex md:space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-800 rounded py-2 px-3"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white rounded py-2 px-3"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-800 rounded py-2 px-3"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white rounded py-2 px-3"
                }
              >
                Explore
              </NavLink>
              <NavLink
                to="/my-trip"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-800 rounded py-2 px-3"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white rounded py-2 px-3"
                }
              >
                My Trip
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden mr-4">
            <button
              type="button"
              className="text-blue-100 hover:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 pb-3 pt-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-800 text-white block rounded py-2 px-3 mx-2"
                : "text-blue-100 hover:bg-blue-700 hover:text-white block rounded py-2 px-3 mx-2"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-800 text-white block rounded py-2 px-3 mx-2"
                : "text-blue-100 hover:bg-blue-700 hover:text-white block rounded py-2 px-3 mx-2"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/my-trip"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-800 text-white block rounded py-2 px-3 mx-2"
                : "text-blue-100 hover:bg-blue-700 hover:text-white block rounded py-2 px-3 mx-2"
            }
          >
            My Trip
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;