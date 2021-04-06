import { useEffect, useState, useCallback } from 'react';
import setValueAtIndex from '../utils/setValueAtIndex';
import { useAuth } from './../hooks/useAuth';

const Quiz = ({ location: { id, name } }) => {
  const { token } = useAuth();

  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);

  const postChoices = useCallback(async () => {
    // validations
    //

    console.log(questions);
    const choices = questions.flatMap(({ choices }) => {
      return choices
        .filter(({ isChecked }) => isChecked)
        .flatMap(({ choiceID }) => choiceID);
    });

    console.log(choices);

    const res = await fetch(
      `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/submissions/${id}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ choices }),
      }
    );

    if (!res.ok) {
      return;
    }

    const { score } = await res.json();

    window.alert(`Your score is ${score}`);

    setQuestions(
      questions.map(({ choices, ...rest }) => ({
        ...rest,
        choices: choices.map((choice) => ({ ...choice, isChecked: false })),
      }))
    );
  }, [questions]);

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
      <h2>{quizName}</h2>
      {questions.map(({ questionID, questionBody, choices }, i) => {
        return (
          <div key={questionID}>
            <h3>{i + 1}</h3>
            <div>{questionBody}</div>
            {choices.map(({ choiceID, choiceBody, isChecked }, j) => {
              return (
                <div key={choiceID}>
                  <input
                    type='radio'
                    checked={isChecked}
                    onChange={() => {
                      setQuestions(
                        questions.map(({ choices, ...rest }, k) => {
                          return {
                            ...rest,
                            choices:
                              k !== i
                                ? choices
                                : choices.map((choice, l) => {
                                    return {
                                      ...choice,
                                      isChecked: l === j,
                                    };
                                  }),
                          };
                        })
                      );
                    }}
                  />
                  <span>{choiceBody}</span>
                </div>
              );
            })}
          </div>
        );
      })}
      <button onClick={postChoices}>Submit</button>
    </div>
  );
};

export default Quiz;
