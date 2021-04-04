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
import Quizzes from './components/Quizzes'

const App = () => {
  return (
    <HashRouter basename='/'>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/admin' exact component={Admin} />
        <Route path='/docs' exact component={Doc} />
        
        <Route path='/quizzes' exact component={Quizzes} />
      </Switch>
    </HashRouter>
  );
};

export default App;
