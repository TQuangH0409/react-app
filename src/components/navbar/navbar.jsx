import {
  faBell,
  faCommentDots,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import img1 from "../../assets/images/avatar.jpg"

function Navbar({ title , avatar }) {
  return (
    <div className="v-navbar-container">
      <div className="v-navbar-inner">
        <h3 className="v-navbar-left">{title}</h3>
        <div className="v-navbar-right">
          <FontAwesomeIcon className="v-navbar-search" icon={faMagnifyingGlass} />
          <FontAwesomeIcon className="v-navbar-mail" icon={faEnvelope} />
          <FontAwesomeIcon className="v-navbar-bell" icon={faBell} />
          <FontAwesomeIcon className="v-navbar-three-dots" icon={faCommentDots} />
          <img src={img1}/>
        </div>
      </div> 
    </div>
  );
}

export default Navbar;
