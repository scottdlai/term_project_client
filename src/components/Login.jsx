import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Home from './Home';

const Login = () => {
  const { push } = useHistory();
  const { login, token } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Returns jsx here
  return token ? (
    <Home />
  ) : (
    <div>
      <h1>Log in</h1>
      <div>
        <input
          type='text'
          value={username}
          placeholder='Username'
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>

      <div>
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <button onClick={() => login(username, password)}>Login</button>
      <button onClick={() => push('/register')}>Register</button>
    </div>
  );
};

export default Login;
