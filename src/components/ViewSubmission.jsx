import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';

const ViewSubmission = () => {

    const [submissions, setSubmissions] = useState([])
    const { token } = useAuth();

    useEffect(() => {
        const getSubmissions = async () => {
            const res = await fetch(
                'https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/submissions/:quizID'
            )
        }
    })

    return (
        <div>
            Hello
        </div>
    )
}

export default ViewSubmission