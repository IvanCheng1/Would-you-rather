import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { handleAnswerQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

class QuestionPoll extends Component {
  state = {
    selected: "",
    answered: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(handleAnswerQuestion(this.props.question.id, this.state.selected));
    this.setState({
      answered: true,
    });
  };

  handleChange = (e) => {
    const text = e.target.value;

    this.setState({
      selected: text,
    });
  };

  render() {
    const { question } = this.props;

    const { name, id, avatar, optionOne, optionTwo } = question;

    if (this.state.answered === true) {
      return <Redirect to={`/question/${id}/results`} />;
    }

    return (
      <div className="question-poll">
        <div className="profile-name">{name} asks</div>

        <div className="question-info">
          <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />

          <div>
            <h2>Would you rather...</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="radio"
                  id="optionOne"
                  name="optionOne"
                  value="optionOne"
                  onChange={this.handleChange}
                  checked={this.state.selected === "optionOne"}
                />
                <label htmlFor="optionOne">{optionOne.text}</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="optionTwo"
                  name="optionTwo"
                  value="optionTwo"
                  onChange={this.handleChange}
                  checked={this.state.selected === "optionTwo"}
                />
                <label htmlFor="optionTwo">{optionTwo.text}</label>
              </div>
              <button
                className="btn"
                type="submit"
                disabled={this.state.selected === ""}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionPoll);
