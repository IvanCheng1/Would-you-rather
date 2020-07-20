import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
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

    const { name, id, timestamp, avatar, optionOne, optionTwo } = question;

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
      <Link to={redirect} className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />

        <div className="question-info">
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          Would you rather...
          <p>{`${optionOne.text.slice(0, 15).trim()}...`}</p>
          <button className="btn">View Poll</button>
        </div>
      </Link>
    );
  }
}

export default connect(mapStateToProps)(Question);
