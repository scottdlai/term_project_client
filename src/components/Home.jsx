import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';

const Home = () => {
  const { token } = useAuth();

  return token ? (
    <nav>
      <ul>
        <li>
          <Link to='/admin'>Admin</Link>
        </li>
        <li>
          <Link to='/quizzes'>Create quizzes</Link>
        </li>
        <li>
          <Link to='/getquizzes'>View quizzes</Link>
        </li>
        <li>
          <Link to='/submissions'>View Submissions</Link>
        </li>
        <li>
          <Link to='/create'>Create / Edit quizzes</Link>
        </li>
        <li>
          <Link to='/docs'>Docs</Link>
        </li>
      </ul>
    </nav>
  ) : (
    <Login />
  );
};

export default Home;
