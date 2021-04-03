import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/admin' exact component={Admin} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
