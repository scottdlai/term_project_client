import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Home from "./Home";
import "./Register.css";

const Register = () => {
  const { push } = useHistory();
  const { register, token } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPasword, setConfirmedPassword] = useState("");

  return token ? (
    <Home />
  ) : (
    <div className={"registerMainContainer"}>
      <h1 className={"registerTitle"}>Welcome!</h1>
      <div className={"inputContainer"}>
        <input
          className={"registerInput"}
          type="text"
          value={username}
          placeholder="Username"
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>

      <div className={"inputContainer"}>
        <input
          className={"registerInput"}
          type="password"
          value={password}
          placeholder="Password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>

      <div className={"inputContainer"}>
        <input
          className={"registerInput"}
          type="password"
          value={confirmedPasword}
          placeholder="Confirm password"
          onChange={({ target: { value } }) => setConfirmedPassword(value)}
        />
      </div>

      <button
        className={"registerBtn_register"}
        onClick={() => {
          if (!password) {
            window.alert("Password can't be empty");
            setPassword("");
            setConfirmedPassword("");
            return;
          }

          if (password !== confirmedPasword) {
            window.alert("Passwords don't match");
            setPassword("");
            setConfirmedPassword("");
            return;
          }

          if (!username) {
            window.alert("Username can't be empty");
            setUsername("");
          }

          register(username, password);
        }}
      >
        Register
      </button>
      <button className={"loginBtn_register"} onClick={() => push("/login")}>
        Login
      </button>
    </div>
  );
};

export default Register;
