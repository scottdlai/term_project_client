import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Returns jsx here
  return (
    <div>
      <input
        type='text'
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
      />

      <input
        type='password'
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />

      <button onClick={() => login(username, password)}>Login</button>
    </div>
  );
};

export default Login;
