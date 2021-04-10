import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';
import './ViewSubmission.css';

const ViewSubmission = () => {
  const [submissions, setSubmissions] = useState([]);

  const { id } = useParams();

  const { token } = useAuth();

  useEffect(() => {
    const getSubmissions = async () => {
      const res = await fetch(
        `https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/submissions/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log('checking point ' + id);

      const submissions = await res.json();
      console.log(submissions);

      setSubmissions(submissions);
    };

    getSubmissions();
  }, [id, token]);

  console.log('test');
  console.log(submissions);
  return token ? (
    <div>
      <div className={'submissionWrapper'}>
        {submissions.length > 0 ? (
          submissions.map((e) => {
            const date = e.submittedAt.substring(0, 10);

            console.log(typeof date);
            console.log(date);

            return (
              <div className={'submissionCard'}>
                <h1 className={'submissionCardusername'}>{e.username}</h1>
                <h1 key={e.id} className={'submissionCardScore'}>
                  score: {e.score}
                </h1>
                <h3 className={'submissionCardDate'}>
                  Submitted Date:{' '}
                  <span className={'yearText'}>(yyyy-mm-dd)</span>
                  {date}
                </h3>
              </div>
            );
          })
        ) : (
          <h1>No Submissions Yet</h1>
        )}
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default ViewSubmission;
