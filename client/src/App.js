import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/landing';
import Main from './pages/main';
import Signin from './pages/signin';
import SignUp from './pages/signup';
import NoMatch from './pages/nomatch';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/main/:id" component={Main} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
