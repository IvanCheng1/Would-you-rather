import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewQuestion from "./NewQuestions";
import QuestionPage from "./QuestionPage";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <LoadingBar />
        <div className="container">
          <Nav />
          {this.props.loading === true ? null : (
            <div>
              <Route path="/" exact component={Dashboard} />
              <Route path="/question/:id" exact component={QuestionPage} />
              <Route path="/new" exact component={NewQuestion} />
              <Route path="/question/:id/results" exact component={QuestionPage} />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
