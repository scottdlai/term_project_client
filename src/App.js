import React from 'react';
import {
  HashRouter,
  // BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Admin from './components/Admin';
import Doc from './components/Doc';
import Home from './components/Home';
import CreateQuiz from './components/CreateQuiz';
import Quizzes from './components/Quizzes';
import { AuthProvider } from './hooks/useAuth';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <AuthProvider>
      <HashRouter basename='/'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/admin' exact component={Admin} />
          <Route path='/docs' exact component={Doc} />
          <Route path='/quizzes' exact component={CreateQuiz} />
          <Route path='/getquizzes' exact component={Quizzes} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
