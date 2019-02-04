import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Callback from './components/Callback/Callback';
import Auth from './components/Auth/Auth';
import history from './history';


// import Saved from "./pages/Saved";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const App = () =>
  <Router history={history}>
    <div>
        <Route path="/" render={(props) => <Home auth={auth} {...props} />} />
        <Route path="/saved" render={(props) => <Saved auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
    </div>
  </Router>;

export default App;
