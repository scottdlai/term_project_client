import React from 'react';
import {
  HashRouter,
  // BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Admin from './components/Admin';
import Home from './components/Home';

const App = () => {
  return (
    <HashRouter basename='/'>
      <Switch>
        <Route path='/admin' exact component={Admin} />
        <Route path='/' exact component={Home} />
      </Switch>
    </HashRouter>
  );
};

export default App;
