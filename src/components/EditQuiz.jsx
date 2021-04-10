import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';

const questionsArOnChangeHandler = (
  questionsAr,
  { action, questionIndex, choiceIndex, value }
) => {
  if (action.toUpperCase() === 'CHOICE_BODY_CHANGE') {
    return questionsAr.map(({ choices, ...rest }, qindex) => {
      return {
        ...rest,
        choices:
          qindex !== questionIndex
            ? choices
            : choices.map(({ choiceBody, ...rest }, cindex) => {
                return {
                  ...rest,
                  choiceBody: cindex !== choiceIndex ? choiceBody : value,
                };
              }),
      };
    });
  }

  if (action.toUpperCase() === 'CHOICE_SELECT_CHANGE') {
    return questionsAr.map(({ choices, ...rest }, qindex) => {
      return {
        ...rest,
        choices:
          qindex !== questionIndex
            ? choices
            : choices.map(({ isCorrect, ...rest }, cindex) => {
                return {
                  ...rest,
                  isCorrect: cindex === choiceIndex,
                };
              }),
      };
    });
  }

  if (action.toUpperCase() === 'QUESTION_BODY_CHANGE') {
    return questionsAr.map(({ questionBody, ...rest }, qindex) => {
      return {
        ...rest,
        questionBody: qindex === questionIndex ? value : questionBody,
      };
    });
  }

  return questionsAr;
};

const EditQuiz = ({ location: { id } }) => {
  const { token } = useAuth();

  const [name, setName] = useState('');
  const [questionsAr, setQuestionsAr] = useState([]);

  const updateName = useCallback(async () => {
    if (!name) {
      setName("Name can't be empty");
      return;
    }

    // console.log(name)
    await fetch(
      `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/${id}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ quizName: name }),
      }
    );
    window.alert('Name changed');
  }, [name, setName, id, token]);

  const updateQuestion = useCallback(
    async (questionID, questionIndex, questionBody, choices) => {
      console.log('Question ID: ' + questionID);
      console.log('Question body: ' + questionBody);
      console.log('Choices: \n' + JSON.stringify(choices));

      await fetch(
        `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/questions/${questionID}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ body: questionBody, choices: choices }),
        }
      );

      window.alert(`#${questionIndex} Question changed`);
    },
    [token]
  );

  useEffect(() => {
    const getQuiz = async () => {
      console.log('CHECKPOINT ' + id);

      const res = await fetch(
        `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/${id}?showAnswers=true`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `bearer ${token}`,
          },
        }
      );

      // returns quizID, quizName, questions
      // console.log(await res.json());
      const { quizName, questions } = await res.json();

      console.log(quizName);
      console.log(questions);

      setName(quizName);

      setQuestionsAr(questions);
      // questionsArDispatch(questions);
    };

    getQuiz();
  }, [id, token]);

  console.log(questionsAr);

  return token ? (
    <div className={'quizWrapper'}>
      <input
        type='text'
        value={name}
        placeholder='Enter name of quiz'
        onChange={({ target: { value } }) => setName(value)}
      />
      <button onClick={updateName}>Change name</button>
      {questionsAr.map(
        ({ questionID, questionBody, choices }, questionIndex) => {
          // console.log("hello testing " + questionIndex)
          return (
            <div key={questionIndex}>
              <h1>{questionIndex + 1}</h1>
              <textarea
                value={questionBody}
                onChange={({ target: { value } }) => {
                  setQuestionsAr(
                    questionsArOnChangeHandler(questionsAr, {
                      action: 'QUESTION_BODY_CHANGE',
                      questionIndex,
                      value,
                    })
                  );
                }}
              ></textarea>
              {choices.map(({ choiceBody, isCorrect }, choiceIndex) => {
                return (
                  <div key={choiceIndex}>
                    <div>
                      <input
                        type='radio'
                        checked={isCorrect}
                        onChange={() => {
                          setQuestionsAr(
                            questionsArOnChangeHandler(questionsAr, {
                              action: 'CHOICE_SELECT_CHANGE',
                              questionIndex,
                              choiceIndex,
                            })
                          );
                        }}
                      />
                      <textarea
                        value={choiceBody}
                        onChange={({ target: { value } }) => {
                          setQuestionsAr(
                            questionsArOnChangeHandler(questionsAr, {
                              action: 'CHOICE_BODY_CHANGE',
                              questionIndex,
                              choiceIndex,
                              value,
                            })
                          );
                          console.log(questionsAr);
                        }}
                      ></textarea>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => {
                  updateQuestion(
                    questionID,
                    questionIndex,
                    questionBody,
                    choices
                  );
                }}
              >
                Change question
              </button>
            </div>
          );
        }
      )}
    </div>
  ) : (
    <Login />
  );
};

export default EditQuiz;
