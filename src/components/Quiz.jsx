import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './../hooks/useAuth';

// const choiceReducer = (choices, { action, choiceIndex, value}) => {
//     if (action.toUpperCase() === 'CHOICE_SELECT_CHANGE') {
//         return questions.map(({ choices, ...rest }, index) => {
//             return {}
//         })
//     }
// }

const Quiz = ({ location: { id, name } }) => {
  const { token } = useAuth();

  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);

  const postChoices = useCallback(async () => {
    // validations

    await fetch(
      `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/submissions/:${id}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          autorization: `brearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    );
  }, []);

  console.log(id, typeof id);
  console.log(name, typeof name);

  useEffect(() => {
    const fetchQuiz = async () => {
      console.log('CHECKPOINT  ' + id);
      const res = await fetch(
        `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `bearer ${token}`,
          },
        }
      );

      const { quizName, questions } = await res.json();

      console.log(questions);
      console.log(quizName);

      setQuizName(quizName);
      console.log(quizName);
      setQuestions(
        questions.map(({ choices, ...question }) => ({
          ...question,
          choices: choices.map((choice) => ({ ...choice, isChecked: false })),
        }))
      );
    };

    fetchQuiz();
  }, [id]);

  return (
    <div>
      <h1>{name}</h1>
      {questions.map(({ choices, ...rest }) => {
        console.log(choices);
        return <div>hello</div>;
      })}
      <button onClick={postChoices}>Submit</button>
    </div>
  );
};

export default Quiz;
