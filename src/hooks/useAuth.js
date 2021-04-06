import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext(localStorage.getItem('token'));

const useProvideAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  const login = useCallback(
    async (username, password) => {
      try {
        const res = await fetch(
          'https://comp-4537-term-project-7zchu.ondigitalocean.app/auth/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          }
        );

        if (!res.ok) {
          throw new Error();
        }

        const { token } = await res.json();

        setToken(token);
      } catch (err) {
        window.alert('Wrong credentials');
      }
    },
    [setToken]
  );

  const register = useCallback(
    async (username, password) => {
      try {
        const res = await fetch(
          'https://comp-4537-term-project-7zchu.ondigitalocean.app/auth/register',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          }
        );

        if (!res.ok) {
          throw new Error();
        }

        const { token } = await res.json();

        setToken(token);
      } catch (err) {
        window.alert('Username already existed!');
      }
    },
    [setToken]
  );

  return { token, login, register };
};

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const { token, login, register } = useProvideAuth();

  return (
    <AuthContext.Provider value={{ token, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
