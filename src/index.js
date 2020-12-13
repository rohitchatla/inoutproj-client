import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reduxThunk from "redux-thunk";

import Header from "./components/header";
import Footer from "./components/footer";
import NoMatch from "./components/nomatch";
import Welcome from "./components/welcome"; //allworks
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import RequireAuth from "./components/auth/require_auth";
import Profile from "./components/userinfo/profile";
import Settings from "./components/userinfo/settings";
import flashpage from "./components/flashpage";
import addwork from "./components/works/addwork";
import myworks from "./components/myworks/myworks";
import agentform from "./components/agent/agentform";
import workdetails from "./components/works/workdetails";

import reducers from "./reducers";
import { AUTH_USER } from "./actions/types";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem("token");
// If we have a token, consider the user to be signed in
if (token) {
  // We need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <div className="container" id="content">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={RequireAuth(Profile)} />
            <Route path="/settings" component={RequireAuth(Settings)} />
            <Route path="/flashpage" component={RequireAuth(flashpage)} />
            <Route path="/addwork" component={RequireAuth(addwork)} />
            <Route path="/myworks" component={RequireAuth(myworks)} />
            <Route path="/agentform" component={RequireAuth(agentform)} />
            <Route
              path="/workdetails/:id"
              component={RequireAuth(workdetails)}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
