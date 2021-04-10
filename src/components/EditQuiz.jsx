import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";

const questionsArOnChangeHandler = (
  questionsAr,
  { action, questionIndex, choiceIndex, value }
) => {
  if (action.toUpperCase() === "CHOICE_BODY_CHANGE") {
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

  if (action.toUpperCase() === "CHOICE_SELECT_CHANGE") {
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

  if (action.toUpperCase() === "QUESTION_BODY_CHANGE") {
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

  const [name, setName] = useState("");
  const [questionsAr, setQuestionsAr] = useState([]);

  const [newQuizBody, setNewQuizBody] = useState("");
  const [newChoices, setNewChoices] = useState([]);

  const [addQuestionBtnState, setAddQuestionBtnState] = useState(false);

  const addQuestionClickHandler = () => {
    if (!addQuestionBtnState) {
      setAddQuestionBtnState(!addQuestionBtnState);
      setNewChoices([...newChoices, { body: "", isCorrect: false }]);
      return;
    }

    setAddQuestionBtnState(!addQuestionBtnState);
    setNewChoices([]);
  };

  const addChoiceClickHandler = () => {
    setNewChoices([...newChoices, { body: "", isCorrect: false }]);
  };

  const updateName = useCallback(async () => {
    if (!name) {
      setName("Name can't be empty");
      return;
    }

    // console.log(name)
    await fetch(
      `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/${id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ quizName: name }),
      }
    );
    window.alert("Name changed");
  }, [name, setName, id, token]);

  const updateQuestion = useCallback(
    async (questionID, questionIndex, questionBody, choices) => {
      console.log("Question ID: " + questionID);
      console.log("Question body: " + questionBody);
      console.log("Choices: \n" + JSON.stringify(choices));

      await fetch(
        `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/questions/${questionID}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ body: questionBody, choices: choices }),
        }
      );

      window.alert(`#${questionIndex} Question changed`);
    },
    [token]
  );

  const postQuestion = useCallback(async () => {
    console.log(newQuizBody);
    console.log(newChoices);

    if (!newQuizBody) {
      setNewQuizBody("Name can't be empty");
      return;
    }

    if (newChoices.length < 2) {
      window.alert("There must be at least 2 choice");
      return;
    }

    if (!newChoices.every(({ body }) => body)) {
      window.alert("Choice can't be empty");
      return;
    }

    if (newChoices.filter(({ isCorrect }) => isCorrect).length === 0) {
      window.alert("There must be only 1 answer choice for this question");
      return;
    }

    await fetch(
      `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/questions/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          questionBody: newQuizBody,
          choices: newChoices,
        }),
      }
    );

    window.alert("Question added");
    setNewQuizBody("");
    setNewChoices([]);
  }, [newChoices, newQuizBody, token, id, setNewChoices, setNewQuizBody]);

  useEffect(() => {
    const getQuiz = async () => {
      console.log("CHECKPOINT " + id);

      const res = await fetch(
        `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/${id}?showAnswers=true`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
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
    <div className={"quizWrapper"}>
      <input
        type="text"
        value={name}
        placeholder="Enter name of quiz"
        onChange={({ target: { value } }) => setName(value)}
      />
      <button onClick={updateName}>Change name</button>
      {questionsAr.map(
        ({ questionID, questionBody, choices }, questionIndex) => {
          // console.log("hello testing " + questionIndex)
          return (
            <div key={questionID}>
              <h1>{questionIndex + 1}</h1>
              <input type="radio" className={"decoRadioBtn"} />
              <textarea
                value={questionBody}
                onChange={({ target: { value } }) => {
                  setQuestionsAr(
                    questionsArOnChangeHandler(questionsAr, {
                      action: "QUESTION_BODY_CHANGE",
                      questionIndex,
                      value,
                    })
                  );
                }}
              ></textarea>
              {choices.map(
                ({ choiceBody, isCorrect, choiceID }, choiceIndex) => {
                  return (
                    <div key={choiceID}>
                      <div>
                        <input
                          type="radio"
                          checked={isCorrect}
                          onChange={() => {
                            setQuestionsAr(
                              questionsArOnChangeHandler(questionsAr, {
                                action: "CHOICE_SELECT_CHANGE",
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
                                action: "CHOICE_BODY_CHANGE",
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
                }
              )}
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
      {addQuestionBtnState ? (
        <div>
          <input type="radio" className={"decoRadioBtn"} />
          <textarea
            placeholder="Enter question"
            value={newQuizBody}
            onChange={({ target: { value } }) => {
              setNewQuizBody(value);
              // console.log(newQuizBody);
            }}
          ></textarea>

          {newChoices.map(({ body, isCorrect }, i) => {
            return (
              <div key={i}>
                <input
                  type="radio"
                  checked={isCorrect}
                  onChange={() => {
                    setNewChoices(
                      newChoices.map(({ isCorrect, ...rest }, index) => {
                        return {
                          ...rest,
                          isCorrect: index === i,
                        };
                      })
                    );
                  }}
                />
                <textarea
                  value={body}
                  onChange={({ target: { value } }) => {
                    setNewChoices(
                      newChoices.map(({ body, ...rest }, index) => {
                        return {
                          ...rest,
                          body: index !== i ? body : value,
                        };
                      })
                    );
                  }}
                ></textarea>
              </div>
            );
          })}

          <button onClick={addChoiceClickHandler}>Add choice</button>
          <button onClick={postQuestion}>Submit</button>
        </div>
      ) : (
        <></>
      )}
      <button onClick={addQuestionClickHandler}>Add question</button>
    </div>
  ) : (
    <Login />
  );
};

export default EditQuiz;
