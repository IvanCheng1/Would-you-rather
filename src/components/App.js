import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewQuestion from "./NewQuestions";
import QuestionPage from "./QuestionPage";
import ProtectedRoute from "./ProtectedRoute";
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
          <Nav authedUser={this.props.authedUser} />
          <Switch>
            <ProtectedRoute path="/" exact authedUser={this.props.authedUser} component={Dashboard} />
            <ProtectedRoute path="/question/:id" exact authedUser={this.props.authedUser} component={QuestionPage} />
            <ProtectedRoute path="/new" exact authedUser={this.props.authedUser} component={NewQuestion} />
            <ProtectedRoute path="/question/:id/results" exact authedUser={this.props.authedUser} component={QuestionPage} />
            <ProtectedRoute path="/leaderboard" exact authedUser={this.props.authedUser} component={Leaderboard} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/login" exact component={Login} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
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
