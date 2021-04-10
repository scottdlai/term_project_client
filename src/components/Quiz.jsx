import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './../hooks/useAuth';
import './Quiz.css'

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
  }, [questions, id, token]);

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
  }, [id, token]);

  return (
    <div className={'quizWrapper'}>
      <h2 className={'quizTitle'}>{quizName}</h2>
      {questions.map(({ questionID, questionBody, choices }, i) => {
        return (
          <div className={'questionWrapper'} key={questionID}>
            <h3 className={'questionNumber'}>{i + 1}</h3>
            <h3 className={'questionTitle'}>{questionBody}</h3>
            {choices.map(({ choiceID, choiceBody, isChecked }, j) => {
              return (
                <div className={'choiceWrapper'} key={choiceID}>
                  <input
                    className={'radioBtn'}
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
                  <span className={'choiceText'}>{choiceBody}</span>
                </div>
              );
            })}
          </div>
        );
      })}
      <button className={'submitBtn'} onClick={postChoices}>Submit</button>
    </div>
  );
};

export default Quiz;
