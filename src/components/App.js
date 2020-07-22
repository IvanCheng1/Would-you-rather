import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <LoadingBar />
        <div className="container">
          {this.props.authedUser && <Nav authedUser={this.props.authedUser} />}

          <Switch>
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
            <Route path="/login" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authed: authedUser !== null,
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
