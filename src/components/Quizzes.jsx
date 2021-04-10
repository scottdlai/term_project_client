import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Login from './Login';
import './Quizzes.css'

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
  }, [token]);

    return token ? (
        <div className={'wholeWrapper'}>
            <h1 className={'pageTitle'}>Quiz List - Quizzes</h1>
            {quizzes.map(({ id, quizName, createdAt }, quizIndex) => {
                const toTake = { 
                    pathname: "/quiz", 
                    id: id,
                    name: quizName
                };

                const toEdit = {
                  pathname: "/edit",
                  id: id,
                  name: quizName
                };

                const toView = {
                  pathname: "/submissions",
                  id: id,
                  name: quizName
                };

                return (
                  <div className={'gridContainer'} key={`quiz-${id}`}>
                      <h5 className={'indexSection'}>{quizIndex + 1}</h5>
                      <h3 className={'nameSection'}>{quizName}</h3>
                      <h4 className={'dateSection'}>{createdAt}</h4>
                      <div className={'cardMenuContainer'}>
                        <nav>
                          <ul className={'cardUL'}>
                            <li className={'menuList'}>
                              <Link className={'link'} to={toTake}>Take Quiz</Link>
                            </li>
                            <li className={'menuList'}>
                              <Link className={'link'} to={toEdit}>Edit Quiz</Link>
                            </li>
                            <li className={'menuList'}>
                              <Link className={'link'} to={toView}>View Submission</Link>
                            </li>
                          </ul>

                        </nav>
                      </div>
                  </div>
            );
        })}
        </div>
        ) : (
            <Login />
          );
}

export default Quizzes;
