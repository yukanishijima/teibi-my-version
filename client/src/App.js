import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/landing';
import Main from './pages/main';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import NoMatch from './pages/nomatch';

import { ThemeProvider } from '@material-ui/core/styles';
import { myTheme } from './utils/myTheme';

function App() {
  return (
    <>
      <ThemeProvider theme={myTheme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/main/:id" component={Main} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
