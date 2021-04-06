import { useEffect, useState, useCallback } from 'react'
import { useAuth } from './../hooks/useAuth'

// const choiceReducer = (choices, { action, choiceIndex, value}) => {
//     if (action.toUpperCase() === 'CHOICE_SELECT_CHANGE') {
//         return questions.map(({ choices, ...rest }, index) => {
//             return {}
//         })
//     }
// }

const Quiz = (props) => {
    
    const { token } = useAuth();
    
    const [quizName, setQuizName] = useState('')
    const [questions, setQuestions] = useState([])


    const postChoices = useCallback(async () => {
        // validations


        await fetch(
            `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/submissions/:${props.location.id}`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'autorization': `brearer ${token}`
                },
                body: JSON.stringify({  })
            }
        )
    }, [])

    console.log(props.location.id, typeof props.location.id)
    console.log(props.location.name, typeof props.location.name)

    useEffect(()=> {
        const fetchQuiz = async () => {
            console.log("CHECKPOINT  " + props.location.id)
            const res = await fetch(
                `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/${props.location.id}`,
                {
                    method: 'GET',
                    headers: { 
                        'Content-type': 'application/json',
                        Authorization: `bearer ${token}`
                    },
                }
                );
            
            const { quizName, questions } = await res.json();

            console.log(questions)
            console.log(quizName)

            setQuizName(quizName)
            console.log(quizName)
            setQuestions(questions.map(({choices, ...question}) => ({
                ...question,
                choices: choices.map((choice) => ({...choice, isChecked: false}))
            })))

        }

        fetchQuiz();
    }, [props.location.id])

    return (
        <div>
            {questions.map(({ choices, ...rest }) => {
                console.log(choices)
                return (
                    <div>
                        hello
                    </div>
                )
            })}
            <button onClick={postChoices}>Submit</button>
        </div>
    )
}

export default Quiz