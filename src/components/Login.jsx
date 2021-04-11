import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Home from "./Home";
import "./Login.css";

const Login = () => {
  const { push } = useHistory();
  const { login, token } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Returns jsx here
  return token ? (
    <Home />
  ) : (
    <div className={"loginMainContainer"}>
      <h1 className={"loginTitle"}>Log in</h1>
      <div className={"loginInputContainer"}>
        <input
          className={"loginInput"}
          type="text"
          value={username}
          placeholder="Username"
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>

      <div className={"loginInputContainer"}>
        <input
          className={"loginInput"}
          type="password"
          value={password}
          placeholder="Password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <button
        className={"loginBtn_login"}
        onClick={() => login(username, password)}
      >
        Login
      </button>
      <button className={"registerBtn_login"} onClick={() => push("/register")}>
        Register
      </button>
    </div>
  );
};

export default Login;
