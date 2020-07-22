import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewQuestion from "./NewQuestions";
import QuestionPage from "./QuestionPage";
import Nav from "./Nav";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Logout from "./Logout";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <LoadingBar />
        <div className="container">
          {this.props.authed === true ? (
            <div>
              <Nav authedUser={this.props.authedUser}/>
              <Route path="/" exact component={Dashboard} />
              <Route path="/question/:id" exact component={QuestionPage} />
              <Route path="/new" exact component={NewQuestion} />
              <Route
                path="/question/:id/results"
                exact
                component={QuestionPage}
              />
              <Route path="/leaderboard" exact component={Leaderboard} />
              <Route path="/logout" exact component={Logout} />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    // loading: authedUser === null,
    // loading: false,
    // authedUser,
    authed: authedUser !== null,
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
