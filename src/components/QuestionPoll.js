import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Redirect } from "react-router-dom";


function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  console.log("HERE", id)
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

class QuestionPoll extends Component {
  state = {
    selected: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = (e) => {
    const text = e.target.value;
    console.log(text);

    this.setState({
      selected: text,
    });
  };

  render() {
    const { question } = this.props;
console.log(question)

    const {
      name,
      id,
      timestamp,
      avatar,
      optionOne,
      optionTwo,
      hasVoted,
    } = question;

    if (hasVoted) {
      return <Redirect to={`/question/${id}/results`} />
    }

    return (
      <div className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />

        <div className="question-info">
          <span>{name} asks</span>
          <h3>Would you rather...</h3>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="radio"
                id="optionOne"
                name="optionOne"
                value="optionOne" // {optionOne.text}
                onChange={this.handleChange}
                checked={this.state.selected === 'optionOne'}
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
                checked={this.state.selected === 'optionTwo'}
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
    );
  }
}

export default connect(mapStateToProps)(QuestionPoll);
