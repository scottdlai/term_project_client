import { useEffect, useState, useCallback } from 'react'

const choiceReducer = (choices, { action, choiceIndex, value}) => {
    if (action.toUpperCase() === 'CHOICE_SELECT_CHANGE') {
        return questions.map(({ choices, ...rest }, index) => {
            return {}
        })
    }
}

const Quiz = (props) => {
    
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
                },
                body: JSON.stringify({ choices })
            }
        )
    }, [choices])

    console.log(props.location.id, typeof props.location.id)
    console.log(props.location.name, typeof props.location.name)

    useEffect(()=> {
        const fetchQuiz = async () => {
            const res = await fetch(
                `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/quizzes/:${props.location.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `brearer ${token}`
                    },

                }
                );
            const { questions } = await res.json();
            console.log(questions)
            setQuestions(questions)

        }
    }, [])

    return (
        <div>
            {/* {questions.map(({ questionID, questionBody, choices }), questionIndex)} */}
            <button onClick={postChoices}>Submit</button>
        </div>
    )
}

export default Quiz