import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
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
              <FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon> CATEGORIES
            </NavLink>
          </li>
          <li>
            <NavLink to="/ingredients">
              <FontAwesomeIcon icon={faList}></FontAwesomeIcon> INGREDIENTS
            </NavLink>
          </li>
          <li>
            <NavLink to="/Area">
              <FontAwesomeIcon icon={faBowlFood}></FontAwesomeIcon> CUISINE
            </NavLink>
          </li>
          <li>
            <NavLink reloadDocument to="/randomeal">
              <FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon> RANDOM MEAL
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
