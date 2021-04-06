import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Login from './Login';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await fetch(
        'https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes',
        { method: 'GET', headers: { Authorization: `bearer ${token}` } }
      );

      const quizzes = await res.json();

      console.log(quizzes);
      setQuizzes(quizzes);
    };

    fetchQuizzes();
  }, []);

    return token ? (
        <div>
            <h1>Quiz List - Quizzes</h1>
            {quizzes.map(({ id, quizName, createdAt }, quizIndex) => {
                const newTo = { 
                    pathname: "/quiz", 
                    id: id,
                    name: quizName
                };
                return (
                
                <div key={`quiz-${id}`}>
                    <h5>{quizIndex + 1}</h5>
                    <Link to={newTo}><h3>{quizName}</h3></Link>
                    <h4>{createdAt}</h4>
                </div>
            );
        })}
        </div>
        ) : (
            <Login />
          );
}

export default Quizzes;
