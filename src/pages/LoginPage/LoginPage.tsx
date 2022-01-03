import { FC, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./login-page.module.scss";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ErrorText = () => {
  return <h2 className={classes.errorText}>Email Or Password Are Incorrect</h2>;
};

const LoginPage: FC = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { state } = useLocation();
  const { passedEmail, passedPassword } = state ?? {};

  const [email, setEmail] = useState(passedEmail || "");
  const [password, setPassword] = useState(passedPassword || "");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const Login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.statusText === "OK") {
        setLoggedInUser(response.data.user);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home");
    }
  }, [loggedInUser]);

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <div className={classes.logo}>
          <div className={classes.personLogo}>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
        </div>
        <form>
          <div className={classes.inputContainer}>
            <label>Email</label>
            <input
              type="text"
              name="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              className={classes.emailInput}
            ></input>
            <label>Password</label>
            <input
              type="password"
              name="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              className={classes.passwordInput}
            ></input>
          </div>

          <div className={classes.buttonContainer}>
            <button
              type="button"
              onClick={() => Login(email, password)}
              className={classes.loginButton}
            >
              LOGIN
            </button>
            <button
              type="button"
              className={classes.signupButton}
              onClick={() => navigate(`/signup`)}
            >
              SIGN UP
            </button>
          </div>
        </form>
        {isError && <ErrorText />}
      </div>
    </div>
  );
};
export default LoginPage;
