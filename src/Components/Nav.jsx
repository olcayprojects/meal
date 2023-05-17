import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'


const Nav = () => {
  return (
    <div className="main">      
     
      <nav>
        <ul>
          <li>
            <NavLink exact="true" to="/">
              <FontAwesomeIcon icon={faUtensils}></FontAwesomeIcon>  RECIPES 
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories"><FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon> CATEGORIES</NavLink>
          </li>
          <li>
            <NavLink to="/ingredients"><FontAwesomeIcon icon={faList}></FontAwesomeIcon> INGREDIENTS</NavLink>
          </li>
          <li>
            <NavLink to="/Area"><FontAwesomeIcon icon={faBowlFood}></FontAwesomeIcon> CUISINE</NavLink>
          </li>
          <li>
            <NavLink reloadDocument to="/randomeal"><FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon> RANDOM MEAL
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
