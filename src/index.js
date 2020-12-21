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
import allProfiles from "./components/profile/allprofiles";
import profileDetails from "./components/profile/profiledetails";
import Transactions from "./components/Transactions/Transactions";
import Settings from "./components/userinfo/settings";
import flashpage from "./components/flashpage";
import Feedback from "./components/feedback";
import addwork from "./components/works/addwork";
import myworks from "./components/myworks/myworks";
import agentform from "./components/agent/agentform";
import workdetails from "./components/works/workdetails";
import agentWorksDone from "./components/agent/agentworksdone";
import reducers from "./reducers";
import { AUTH_USER } from "./actions/types";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/landing/assets/styles/tailwind.css";

// layouts

import Admin from "./landing/layouts/Admin.js";
import Auth from "./landing/layouts/Auth.js";

// views without layouts

import Landing from "./landing/views/Landing.js";
import Profiles from "./landing/views/Profile.js";
import Index from "./landing/views/Index";

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
            <Route exact path="/" component={Index} />
            <Route exact path="/works" component={Welcome} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={RequireAuth(Profile)} />
            <Route path="/allprofiles" component={allProfiles} />
            <Route path="/profiledetails/:id" component={profileDetails} />
            <Route path="/settings" component={RequireAuth(Settings)} />
            <Route path="/flashpage" component={RequireAuth(flashpage)} />
            <Route path="/feedback" component={RequireAuth(Feedback)} />
            <Route path="/addwork" component={RequireAuth(addwork)} />
            <Route path="/myworks" component={RequireAuth(myworks)} />
            <Route path="/transactions" component={RequireAuth(Transactions)} />

            <Route
              path="/agentworksdone"
              component={RequireAuth(agentWorksDone)}
            />
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
