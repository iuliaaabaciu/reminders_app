import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import LogIn from './LogIn';
import Register from './Register';
import RemindersComp from './RemindersComp';
import Homepage from './Homepage';

const App = () => {
  return(
    // <div>
    //   <Homepage />
    //   <RemindersComp />
    // </div>

    <BrowserRouter>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={LogIn} />
        <Route path='/reminders' component={RemindersComp} />
        <Route path='/home' component={Homepage} />
        <Redirect from ='/' to='/home' component={Homepage} />
      </Switch>
    </BrowserRouter>

  )
}

export default App;
