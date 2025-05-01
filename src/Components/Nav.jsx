import { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 bg-dark shadow-md z-50">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={require("../images/recipes.png")}
            alt="Logo"
            className="h-[60px] abc"
          />
        </NavLink>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <div className="space-y-2">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:ml-auto gap-3 md:gap-4 text-center">
            <li>
              <NavLink
                to="/categories"
                className="no-underline border-2 border-yellow-500 bg-black text-yellow-500 px-2 py-1 rounded-lg text-lg hover:bg-yellow-500 hover:text-black transition"
              >
                <i className="bi bi-card-list mr-2"></i> CATEGORIES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ingredients"
                className="no-underline border-2 border-yellow-500 bg-black text-yellow-500 px-2 py-1 rounded-lg text-lg hover:bg-yellow-500 hover:text-black transition"
              >
                <i className="bi bi-list-ul mr-2"></i> MAIN INGREDIENTS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Area"
                className="no-underline border-2 border-yellow-300 bg-black text-yellow-500 px-2 py-1 rounded-lg text-lg hover:bg-yellow-500 hover:text-black transition"
              >
                <i className="bi bi-globe mr-2"></i> CUISINE
              </NavLink>
            </li>
            <li>
              <NavLink
                reloadDocument
                to="/randomeal"
                className="no-underline border-2 border-yellow-500 bg-black text-yellow-500 px-2 py-1 rounded-lg text-lg hover:bg-yellow-500 hover:text-black transition"
              >
                <i className="bi bi-shuffle mr-2"></i> RANDOM MEAL
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
