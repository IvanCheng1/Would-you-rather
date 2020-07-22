import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { Link } from "react-router-dom";

function mapStateToProps({ authedUser, users, questions }, { id, activeTab }) {
  let question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
    activeTab,
  };
}

class Question extends Component {
  render() {
    const { question, authedUser, activeTab } = this.props;

    if (question === null) {
      return <p>This Question does not exist</p>;
    }

    const { name, id, avatar, optionOne } = question;

    let redirect = "";
    const hasVoted =
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser);

    if (activeTab === "unanswered") {
      if (hasVoted) {
        // don't show question as it's been answered by authed user
        return false;
      } else {
        redirect = `/question/${id}`;
      }
    } else if (activeTab === "answered") {
      if (hasVoted) {
        redirect = `/question/${id}/results`;
      } else {
        // don't show question as it's not been answered by authed user
        return false;
      }
    }

    return (
      <div className="question">
        <div className="profile-name">{name} asks</div>
        <div className="question-info">
          <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
          <div>
            <h3>Would you rather</h3>
            <p>{`...${optionOne.text.slice(0, 15).trim()}... or...`}</p>
            <Link to={redirect}>
              <button className="btn">View Poll</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Question);
