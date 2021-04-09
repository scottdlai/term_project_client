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
import Quiz from './components/Quiz';
import { AuthProvider } from './hooks/useAuth';
import Login from './components/Login';
import Register from './components/Register';
import ViewSubmission from './components/ViewSubmission'
import EditQuiz from './components/EditQuiz';

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
          <Route path='/quiz' exact component={Quiz} />
          <Route path='/submissions' exact component={ViewSubmission} />
          <Route path='/edit' exact component={EditQuiz} />
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
