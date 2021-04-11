import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";
import "./Home.css";

const Home = () => {
  const { token } = useAuth();

  return token ? (
    <nav>
      <ul className={"listContainer"}>
        <li className={"menuItem"}>
          <Link className={"linkItem"} to="/admin">
            Admin
          </Link>
        </li>
        <li className={"menuItem"}>
          <Link className={"linkItem"} to="/quizzes">
            Create quizzes
          </Link>
        </li>
        <li className={"menuItem"}>
          <Link className={"linkItem"} to="/getquizzes">
            View quizzes
          </Link>
        </li>
        {/* <li className={'menuItem'}>
          <Link className={'linkItem'} to='/submissions'>View Submissions</Link>
        </li> */}
        <li className={"menuItem"}>
          <Link className={"linkItem"} to="/docs">
            Docs
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <Login />
  );
};

export default Home;
