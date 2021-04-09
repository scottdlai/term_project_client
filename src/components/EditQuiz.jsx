import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';

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
        )
        window.alert('Name changed');
        
    }, [name, setName])

    useEffect(() => {
        const getQuiz = async () => {
            console.log('CHECKPOINT ' + id)

            const res = await fetch(
                `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/${id}?showAnswers=true`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `bearer ${token}`
                    },
                    
                }
            );
            
            // returns quizID, quizName, questions
            // console.log(await res.json());
            const { quizName, questions } = await res.json();
            
            console.log(quizName)
            console.log(questions)
            
            setName(quizName);
            setQuestionsAr(questions);
        }

        getQuiz();
    }, [id])

    console.log(questionsAr)
    return token ? (
        <div className={'quizWrapper'}>
            <input type="text" 
                   value={name} 
                   placeholder='Enter name of quiz'
                   onChange={({ target: { value } }) => setName(value)} />
            <button onClick={updateName}>Change name</button>
            {questionsAr.map(({ questionBody, choices }, questionIndex) => {
                return (
                    <div key={questionIndex}>
                        <h1>{questionIndex + 1}</h1>
                        <textarea value={questionBody}></textarea>
                        {choices.map(({ choiceBody, isCorrect }, choiceIndex) => {
                            return (
                                <div key={choiceIndex}>
                                    <div>
                                        <input type="radio" checked={isCorrect}/>
                                        <textarea value={choiceBody} ></textarea>
                                    </div>
                                </div> 
                            )
                        })}
                        <button>Change question</button>
                    </div>
                )
            })}
        </div>
    ) : (
        <Login />
        )

}

export default EditQuiz