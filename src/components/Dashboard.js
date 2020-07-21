import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

class Dashboard extends Component {
  state = {
    activeTab: "unanswered",
  };

  handleTab = e => {
    const value = e.target.value
    this.setState({
      activeTab: value
    })
    // console.log(value)
  }

  render() {
    return (
      <div>
        <nav className="nav-tabs">
          <ul>
            <li>
              <button type="button" onClick={this.handleTab} value="unanswered" className={this.state.activeTab === "unanswered" ? "tab tab-active" : "tab"}>
                Unanswered Questions
              </button>
            </li>
            <li>
              <button type="button" onClick={this.handleTab} value="answered" className={this.state.activeTab === "answered" ? "tab tab-active" : "tab"}>
                Answered Questions
              </button>
            </li>
          </ul>
        </nav>
        <h3 className="center">Questions</h3>
        <ul className="dashboard-list">
          {this.props.questionIds.map((id) => (
              <Question key={id} id={id} activeTab={this.state.activeTab}/>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
