import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionPoll from "./QuestionPoll";
import QuestionPollAnswer from "./QuestionPollAnswer";
import { formatQuestion } from "../utils/helpers";
import { Redirect } from "react-router-dom";

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  return {
    id,
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

class QuestionPage extends Component {
  render() {
    if (!this.props.authedUser) {
      return <Redirect to="/login" />;
    }
    const { id, authedUser, question } = this.props;

    if (question === null) {
      return <Redirect to="/404" />;
    }

    let answered = "";
    if (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    ) {
      answered = true;
    } else {
      answered = false;
    }

    return (
      <div>
        {answered ? <QuestionPollAnswer id={id} /> : <QuestionPoll id={id} />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionPage);
