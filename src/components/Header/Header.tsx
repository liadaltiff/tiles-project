import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import classes from "./header.module.scss";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  setLoggedInUser(loggedInUser);
  const navigate = useNavigate();

  const LogOut = () => {
    setLoggedInUser(undefined);
    navigate("/login");
  };
  return (
    <nav className={classes.navbar}>
      <button onClick={LogOut} className={classes.buttonStyle}>
        <div className={classes.userContainer}>
          <img className={classes.logo} src="assets/profile.png" />
          <div className={classes.textContainer}>
            <h2>{loggedInUser?.fullName}</h2>
            <h3>{loggedInUser?.role}</h3>
          </div>
        </div>
      </button>
      {loggedInUser?.role === "Admin" && (
        <div className={classes.navigating}>
          <button className={classes.tmp} onClick={() => navigate(`/home`)}>
            TMP
          </button>
          <button className={classes.ump} onClick={() => navigate(`/admin`)}>
            UMP
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
