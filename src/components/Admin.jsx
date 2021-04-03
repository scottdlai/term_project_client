import React, { useEffect, useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [apiCounts, setAPICounts] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await fetch('http://localhost:8000/api/v0/admin');
      const { apiCounts } = await res.json();

      console.log(apiCounts);
      setAPICounts(apiCounts);
    };

    fetchAdmin();
  }, []);

  return apiCounts.length > 0 ? (
    <div id='container-admin'>
      <h1>Dash board</h1>
      {apiCounts.map(({ apiName, count }) => {
        const [method, endpoint] = apiName.split(' ');

        return (
          <div key={apiName} className='container'>
            <span className='method'>{method}</span>
            <span className='endpoint'>{endpoint}</span>
            <span className='count'>{count}</span>
          </div>
        );
      })}
    </div>
  ) : (
    <h1>Loadding...</h1>
  );
};

export default Admin;
