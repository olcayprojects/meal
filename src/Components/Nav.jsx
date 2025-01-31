import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <NavLink exact="true" to="/">
          <img
            className="img abc ms-2"
            src={require("../images/recipes.png")}
            alt=""
            height="56"
            srcSet=""
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex ms-auto me-2">
            <li></li>
            <li className="pe-1">
              <NavLink
                to="/categories"
                className="nav-link bg-black p-3 rounded-3 fs-5"
              >
                <i className="bi bi-card-list"></i> CATEGORIES
              </NavLink>
            </li>
            <li className="nav-item pe-1">
              <NavLink
                to="/ingredients"
                className="nav-link bg-black p-3 rounded-3 fs-5"
              >
                <i className="bi bi-list-ul"></i> MAIN INGREDIENTS
              </NavLink>
            </li>
            <li className="nav-item pe-1">
              <NavLink
                to="/Area"
                className="nav-link bg-black p-3 rounded-3 fs-5"
              >
                <i className="bi bi-globe"></i> CUISINE
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                reloadDocument
                to="/randomeal"
                className="nav-link bg-black p-3 rounded-3 fs-5"
              >
                <i className="bi bi-shuffle pe-1"></i> RANDOM MEAL
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
