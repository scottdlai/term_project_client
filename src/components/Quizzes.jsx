import { useCallback, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

import Login from './Login';
import './Quizzes.css';

const useStyles = makeStyles({
  mainContainer: {
    gridArea: 'deleteBtn',
    textAlign: 'right',
    paddingRight: '3em',
  },

  btnContainer: {
    paddingRight: '0',
    paddingTop: '0',
  },

  btn: {
    color: 'white',
    fontSize: '1.5em',
    transition: 'all .6s ease-out',
    '&:hover': {
      transform: 'scale(1.7)',
      color: '#a80000',
    },
  },
});

const Quizzes = () => {
  const classes = useStyles();

  const [quizzes, setQuizzes] = useState([]);
  const { token } = useAuth();

  const deleteQuiz = useCallback(
    async (id) => {
      console.log('in delete');
      const res = await fetch(
        `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/${id}`,
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      window.alert('Quiz deleted');
      setQuizzes((quizzes) =>
        quizzes.filter(({ id: quizID }) => quizID !== id)
      );
    },
    [token, setQuizzes]
  );

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

  if (!token) {
    return <Login />;
  }

  if (quizzes.length === 0) {
    return <h1 className='pageTitle'>No quizzes yet. Go create a new one!</h1>;
  }

  return token ? (
    <div className={'wholeWrapper'}>
      <h1 className={'pageTitle'}>Quiz List - Quizzes</h1>
      {quizzes.map(({ id, quizName, createdAt }, quizIndex) => {
        const toTake = {
          pathname: `/quiz/${id}`,
        };

        const toEdit = {
          pathname: `/edit/${id}`,
        };

        const toView = {
          pathname: `/submissions/${id}`,
        };

        return (
          <div className={'gridContainer'} key={`quiz-${id}`}>
            <div
              className={`deleteBtnContainer ${classes.mainContainer}`}
              onClick={() => deleteQuiz(id)}
            >
              <IconButton className={classes.btnContainer}>
                <CancelIcon className={classes.btn} />
              </IconButton>
            </div>
            <h5 className={'indexSection'}>{quizIndex + 1}</h5>
            <h3 className={'nameSection'}>{quizName}</h3>
            <h4 className={'dateSection'}>{createdAt}</h4>
            <div className={'cardMenuContainer'}>
              <nav>
                <ul className={'cardUL'}>
                  <li className={'menuList'}>
                    <Link className={'link'} to={toTake}>
                      Take Quiz
                    </Link>
                  </li>
                  <li className={'menuList'}>
                    <Link className={'link'} to={toEdit}>
                      Edit Quiz
                    </Link>
                  </li>
                  <li className={'menuList'}>
                    <Link className={'link'} to={toView}>
                      View Submission
                    </Link>
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
};

export default Quizzes;
