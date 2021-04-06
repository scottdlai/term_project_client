import { useState, useEffect } from 'react';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  // const quizzes = [
  //   {
  //     id: 13,
  //     quizName: 'math',
  //     createdAt: '2021-04-03T07:00:00.000Z',
  //   },
  //   {
  //     id: 14,
  //     quizName: 'english',
  //     createdAt: '2021-04-03T07:00:00.000Z',
  //   },
  // ];

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await fetch(
        'https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes'
      );

      const quizzes = await res.json();

      console.log(quizzes);
      setQuizzes(quizzes);
    };

    fetchQuizzes();
  }, []);

  return true ? (
    <div>
      <h1>Quiz List - Quizzes</h1>
      {quizzes.map(({ quizName, createdAt, id }, quizIndex) => {
        return (
          <div key={id}>
            <h5>{quizIndex + 1}</h5>
            <h3>{quizName}</h3>
            <h4>{createdAt}</h4>
          </div>
        );
      })}
    </div>
  ) : (
    <h1>Loadding...</h1>
  );
};

export default Quizzes;
