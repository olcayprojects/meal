import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink exact="true" to="/">
          <img
            className="img abc"
            src={require("../images/recipes.png")}
            alt=""
            height="56"
            srcSet=""
          />
        </NavLink>

        <ul>
          <li></li>
          <li>
            <NavLink to="/categories">
              <i className="bi bi-card-list"></i> CATEGORIES
            </NavLink>
          </li>
          <li>
            <NavLink to="/ingredients">
              <i className="bi bi-list-ul"></i> MAIN INGREDIENTS
            </NavLink>
          </li>
          <li>
            <NavLink to="/Area">
              <i className="bi bi-globe"></i> CUISINE
            </NavLink>
          </li>
          <li>
            <NavLink reloadDocument to="/randomeal">
              <i className="bi bi-shuffle pe-1"></i> RANDOM MEAL
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
