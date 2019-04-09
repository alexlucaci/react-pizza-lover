import ReactDOM from 'react-dom';
import React, { Component } from "react";
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import AppliedRoute from './AppliedRoute';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Login from "./containers/Login";
import Register from "./containers/Register";
import Home from "./containers/Home";
import FanClub from "./containers/FanClub";

class Routes extends Component {

  render() {
    return(
      <Router>
        <div>
          <Switch>
            <AppliedRoute exact path="/" component={Home}/>
            <AppliedRoute path="/login" component={Login}/>
            <AppliedRoute path="/register" component={Register}/>
            <AppliedRoute path="/fanclub" component={FanClub}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>
    )
  }
}
ReactDOM.render(<Routes/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
