import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './Admin.css';
import Login from './Login';

const Admin = () => {
  const { token } = useAuth();
  const [apiCounts, setAPICounts] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(
          'https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/admin',
          { method: 'GET', headers: { Authorization: `bearer ${token}` } }
        );

        if (!res.ok) {
          throw new Error('');
        }
        const { apiCounts } = await res.json();

        console.log(apiCounts);
        setAPICounts(apiCounts);
      } catch (error) {
        setAPICounts([]);
      }
    };

    fetchAdmin();
  }, []);

  return token ? (
    apiCounts.length > 0 ? (
      <div id='container-admin'>
        <h1 className={'adminTitle'}>Dash board</h1>
        {apiCounts.map(({ apiName, count }) => {
          const [method, endpoint] = apiName.split(' ');

          return (
            <div key={apiName} className={`container ${method}container`}>
              <span className='method'>{method}</span>
              <span className='endpoint'>{endpoint}</span>
              <span className='count'>{count}</span>
            </div>
          );
        })}
      </div>
    ) : (
      <h1 className={'loadingTxt'}>Loading...</h1>
    )
  ) : (
    <Login />
  );
};

export default Admin;
