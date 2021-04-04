import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/admin'>Admin</Link>
        </li>
        <li>
          <Link to='/quizzes'>Take quizzes</Link>
        </li>
        <li>
          <Link to='/submissions'>View Submissions</Link>
        </li>
        <li>
          <Link to='/create'>Create / Edit quizzes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;