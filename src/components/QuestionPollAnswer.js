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
    const optionOnePerc = Math.round((1000 * optionOneVotes) / voteNumber) / 10;
    const optionTwoPerc = Math.round((1000 * optionTwoVotes) / voteNumber) / 10;

    // console.log(optionTwo);

    return (
      <div className="question-poll">
        <div className="profile-name">Asked by {name}</div>

        <div className="question-info">
          <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />

          <div className="question-results">
            <h2>Results:</h2>
            <div
              className={`question-results-options ${
                optionOne.votes.includes(authedUser) && "chosen"
              }`}
            >
              <div className="badge">
                <div className="your-vote">Your vote</div>
              </div>
              <p>{optionOne.text}</p>

              <div className="percentage-border">
                <div
                  className="percentage-fill"
                  style={{ width: optionOnePerc + "%" }}
                >
                  <div className="percentage-number">{optionOnePerc}%</div>
                </div>
              </div>
              <div className="question-votes">
                {`${optionOneVotes} out of ${voteNumber} people voted`}
              </div>
            </div>
            <div
              className={`question-results-options ${
                optionTwo.votes.includes(authedUser) && "chosen"
              }`}
            >
              <div className="badge">
                <div className="your-vote">Your vote</div>
              </div>
              <p>{optionTwo.text}</p>

              <div className="percentage-border">
                <div
                  className="percentage-fill"
                  style={{ width: optionTwoPerc + "%" }}
                >
                  <div className="percentage-number">{optionTwoPerc}%</div>
                </div>
              </div>
              <div className="question-votes">
                {`${optionTwoVotes} out of ${voteNumber} people voted`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionPollAnswer);
