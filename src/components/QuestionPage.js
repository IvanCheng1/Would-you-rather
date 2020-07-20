import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import NewQuestions from "./NewQuestions";
import QuestionPoll from "./QuestionPoll";
import QuestionPollAnswer from "./QuestionPollAnswer";
import { formatQuestion, formatDate } from "../utils/helpers";

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  let answered = ''
  if (
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser)
  ) {
    answered = true;
  } else {
    answered = false;
  }

  return {
    answered,
    id,
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

class QuestionPage extends Component {
  render() {
    const { id, answered, authedUser, question } = this.props;

    console.log(authedUser, question.name);
    return (
      <div>
        {answered ? <QuestionPollAnswer id={id} /> : <QuestionPoll id={id} />}
        {/* <QuestionPoll id={id} /> */}
        {/* <QuestionPollAnswer id={id} /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionPage);
