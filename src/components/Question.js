import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

class Question extends Component {
  render() {
    const { question, authedUser } = this.props;

    if (question === null) {
      return <p>This Question does not exist</p>;
    }

    // console.log(this.props)

    const {
      name,
      id,
      timestamp,
      avatar,
      optionOne,
      optionTwo,
      hasVoted,
    } = question;

    let redirect = "";
    if (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    ) {
      redirect = `/question/${id}/results`;
    } else {
      redirect = `/question/${id}`;
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
