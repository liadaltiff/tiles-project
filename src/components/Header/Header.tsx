import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import classes from "./header.module.scss";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  setLoggedInUser(loggedInUser);
  const navigate = useNavigate();
  const location = useLocation();

  const LogOut = () => {
    setLoggedInUser(undefined);
    navigate("/login");
  };

  return (
    <nav className={classes.navbar}>
      <button onClick={LogOut} className={classes.buttonStyle}>
        <div className={classes.userContainer}>
          <div className={classes.logo}>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <div className={classes.textContainer}>
            <h2>{loggedInUser?.fullName}</h2>
            <h3>{loggedInUser?.role}</h3>
          </div>
        </div>
      </button>
      {loggedInUser?.role === "Admin" && (
        <div className={classes.navigating}>
          <button className={classes.tmp} onClick={() => navigate(`/home`)}>
            <FontAwesomeIcon icon={faUserCog} />
          </button>
          <button className={classes.ump} onClick={() => navigate(`/admin`)}>
            <FontAwesomeIcon icon={faClone} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
