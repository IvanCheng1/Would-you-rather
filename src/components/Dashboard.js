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
        <nav className="nav">
          <ul>
            <li>
              <button type="button" onClick={this.handleTab} value="unanswered" className={this.state.activeTab === "unanswered" ? "btn active" : "btn"}>
                Unanswered Questions
              </button>
            </li>
            <li>
              <button type="button" onClick={this.handleTab} value="answered" className={this.state.activeTab === "answered" ? "btn active" : "btn"}>
                Answered Questions
              </button>
            </li>
          </ul>
        </nav>
        <h3 className="center">Questions</h3>
        <ul className="dashboard-list">
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Question id={id} activeTab={this.state.activeTab}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
