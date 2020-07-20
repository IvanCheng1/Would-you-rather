import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

class QuestionPollAnswer extends Component {
  render() {
    const { question, authedUser } = this.props;

    const {
      name,
      id,
      timestamp,
      avatar,
      optionOne,
      optionTwo,
      hasVoted,
    } = question;

    const optionOneVotes = optionOne.votes.length;
    const optionTwoVotes = optionTwo.votes.length;
    const voteNumber = optionOneVotes + optionTwoVotes;

    // console.log(optionTwo);

    return (
      <div className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />

        <div className="question-info">
          <span>Asked by {name}</span>
          <h3>Results:</h3>
          <div>
            {optionOne.text}
            <br></br>
            {`${optionOneVotes} of ${voteNumber} people voted`}

            {optionOne.votes.includes(authedUser) && ' - you voted this' }
          </div>
          <div>
            {optionTwo.text}
            <br></br>
            {`${optionTwoVotes} of ${voteNumber} people voted`}
            {optionTwo.votes.includes(authedUser) && ' - you voted this' }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionPollAnswer);
