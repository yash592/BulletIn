import React from "react";
import { Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Callback from './components/Callback/Callback';
import Auth from './components/Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  console.log(location);
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const mainRoutes = () => {

  return (
    <Router history={history}>
      <div>
          <Route exact path="/" render={(props) =>  <Home auth={auth} {...props}/>} />
          <Route path="/saved" render={(props) => <Saved auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }}/>
      </div>

    </Router>
  )
}
