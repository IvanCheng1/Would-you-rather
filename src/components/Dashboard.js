import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Redirect } from "react-router-dom";

function mapStateToProps({ questions, authedUser }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    authedUser,
  };
}

class Dashboard extends Component {
  state = {
    activeTab: "unanswered",
  };

  handleTab = (e) => {
    const value = e.target.value;
    this.setState({
      activeTab: value,
    });
  };

  render() {
    if (!this.props.authedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <nav className="nav-tabs">
          <ul>
            <li>
              <button
                type="button"
                onClick={this.handleTab}
                value="unanswered"
                className={
                  this.state.activeTab === "unanswered"
                    ? "tab tab-active"
                    : "tab"
                }
              >
                Unanswered Questions
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={this.handleTab}
                value="answered"
                className={
                  this.state.activeTab === "answered" ? "tab tab-active" : "tab"
                }
              >
                Answered Questions
              </button>
            </li>
          </ul>
        </nav>
        <h3 className="center">Questions</h3>
        <ul className="dashboard-list">
          {this.props.questionIds.map((id) => (
            <Question key={id} id={id} activeTab={this.state.activeTab} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
