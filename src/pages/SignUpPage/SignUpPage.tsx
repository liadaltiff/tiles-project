import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./signup-page.module.scss";

const ErrorText = () => {
  return <h2 className={classes.errorText}>The Email Already Exist</h2>;
};

const SignUpPage: FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const CreateUser = useCallback(() => {
    const sendrequest = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/users", {
          fullName,
          email,
          password,
        });

        if (response.status >= 200 && response.status <= 399) {
          navigate(`/login`, {
            state: {
              passedEmail: email,
              passedPassword: password,
            },
          });
        } else if (response.status > 399) {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
    };

    sendrequest();
  }, [fullName, email, password]);

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
            <label>Full Name</label>
            <input
              type="text"
              name="FullName"
              value={fullName}
              autoComplete="off"
              onChange={(e) => {
                setFullName(e.currentTarget.value);
              }}
              className={classes.fullNameInput}
            ></input>
            <label>Email</label>
            <input
              type="text"
              name="Email"
              value={email}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              className={classes.emailInput}
            ></input>
            <label>Password</label>
            <input
              type="password"
              name="Password"
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              className={classes.passwordInput}
            ></input>
          </div>

          <div className={classes.buttonContainer}>
            <button
              type="button"
              onClick={CreateUser}
              className={classes.signupButton}
            >
              SIGN UP
            </button>
            <button
              type="button"
              className={classes.loginButton}
              onClick={() => navigate(`/login`)}
            >
              LOGIN
            </button>
          </div>
        </form>
        {isError && <ErrorText />}
      </div>
    </div>
  );
};
export default SignUpPage;
