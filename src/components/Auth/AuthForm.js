import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { encode } from "base-64";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const URL = process.env.REACT_APP_URL_SERVER
    ? process.env.REACT_APP_URL_SERVER + "users/login"
    : "https://xuzn6mlcb3.execute-api.eu-west-3.amazonaws.com/DEV/users/login";

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // validation?

    setIsLoading(true);

    fetch(URL, {
      method: "POST",
      headers: new Headers({
        Authorization:
          "Basic " + encode(enteredUsername + ":" + enteredPassword),
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        let minutesToAdd = 30;
        let currentDate = new Date();
        let expirationTime = new Date(
          currentDate.getTime() + minutesToAdd * 60000
        );
        authCtx.login(data.token, expirationTime.toISOString(), data.user);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
