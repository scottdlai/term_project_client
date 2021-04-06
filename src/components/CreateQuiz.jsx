import React, { useReducer, useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import setValueAtIndex from '../utils/setValueAtIndex';
import './CreateQuiz.css';
import Login from './Login';

const questionsReducer = (
  questions,
  { action, questionIndex, choiceIndex, value }
) => {
  if (action.toUpperCase() === 'ADD_QUESTION') {
    return [
      ...questions,
      { body: '', choices: [{ body: '', isCorrect: true }] },
    ];
  }

  if (action.toUpperCase() === 'ADD_CHOICE') {
    return setValueAtIndex(questions, questionIndex, ({ body, choices }) => ({
      body,
      choices: [...choices, { body: '', isCorrect: false }],
    }));
  }

  if (action.toUpperCase() === 'QUESTION_BODY_CHANGE') {
    return setValueAtIndex(questions, questionIndex, (question) => ({
      ...question,
      body: value,
    }));
  }

  if (action.toUpperCase() === 'CHOICE_BODY_CHANGE') {
    return questions.map(({ choices, ...rest }, i) => {
      return {
        ...rest,
        choices:
          i !== questionIndex
            ? choices
            : choices.map(({ body, ...choice }, j) => {
                return {
                  ...choice,
                  body: j !== choiceIndex ? body : value,
                };
              }),
      };
    });
  }

  if (action.toUpperCase() === 'CHOICE_SELECT_CHANGE') {
    return questions.map(({ choices, ...rest }, i) => {
      return {
        ...rest,
        choices:
          i !== questionIndex
            ? choices
            : choices.map((choice, j) => {
                return {
                  ...choice,
                  isCorrect: j === choiceIndex,
                };
              }),
      };
    });
  }

  return [];
};

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState('');

  const [questions, questionsDispatch] = useReducer(questionsReducer, []);

  const { token } = useAuth();

  const createQuiz = useCallback(async () => {
    if (!quizName) {
      setQuizName("Name can't be empty");
      return;
    }

    if (questions.length === 0) {
      window.alert('There must be at least 1 questions');
      return;
    }

    if (!questions.every(({ body }) => body)) {
      window.alert("Question can't be empty");
      return;
    }

    if (!questions.every(({ choices }) => choices.every(({ body }) => body))) {
      window.alert("Choices can't be empty");
      return;
    }

    if (!questions.every(({ choices }) => choices.length > 1)) {
      window.alert('There must be at least 2 choices for each questions');
      return;
    }

    await fetch(
      'https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `beaer ${token}`,
        },
        body: JSON.stringify({ quizName, questions }),
      }
    );
    window.alert('Added quiz');
  }, [quizName, questions]);

  return token ? (
    <div>
      <input
        type='text'
        className='quiz-name'
        value={quizName}
        placeholder='Enter name of quiz'
        onChange={({ target: { value } }) => setQuizName(value)}
      />
      <br />
      {questions.map(({ body, choices }, questionIndex) => {
        return (
          <div key={questionIndex}>
            <h3>Question {questionIndex + 1}</h3>
            <textarea
              className='question-area'
              value={body}
              placeholder='Enter question'
              onChange={({ target: { value } }) => {
                questionsDispatch({
                  action: 'QUESTION_BODY_CHANGE',
                  questionIndex,
                  value,
                });
              }}
            ></textarea>
            <br />
            {choices.map(({ isCorrect, body }, choiceIndex) => {
              return (
                <div key={choiceIndex}>
                  <input
                    type='radio'
                    checked={isCorrect}
                    onChange={() => {
                      questionsDispatch({
                        action: 'CHOICE_SELECT_CHANGE',
                        questionIndex,
                        choiceIndex,
                      });
                    }}
                  />
                  <textarea
                    value={body}
                    onChange={({ target: { value } }) => {
                      questionsDispatch({
                        action: 'CHOICE_BODY_CHANGE',
                        questionIndex,
                        choiceIndex,
                        value,
                      });
                    }}
                  ></textarea>
                </div>
              );
            })}
            <button
              key={`button-${questionIndex}`}
              onClick={() =>
                questionsDispatch({ action: 'ADD_CHOICE', questionIndex })
              }
            >
              Add a choice
            </button>
            <hr />
          </div>
        );
      })}
      <button onClick={() => questionsDispatch({ action: 'ADD_QUESTION' })}>
        Add question
      </button>
      <button onClick={createQuiz}>Add Quiz</button>
    </div>
  ) : (
    <Login />
  );
};

export default CreateQuiz;
