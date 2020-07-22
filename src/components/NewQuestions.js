import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

class NewQuestions extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleChangeOne = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      optionOneText: text,
    }));
  };

  handleChangeTwo = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      optionTwoText: text,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    });
  };

  render() {
    if (!this.props.authedUser) {
      return <Redirect to="/login" />;
    }

    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h2 className="centre">Would you rather...</h2>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Option One"
            value={optionOneText}
            onChange={this.handleChangeOne}
            className="textarea"
            maxLength={300}
          />
          <div className="or-text">OR</div>
          <textarea
            placeholder="Option Two"
            value={optionTwoText}
            onChange={this.handleChangeTwo}
            className="textarea"
            maxLength={300}
          />
          <button
            className="btn new-question-btn"
            type="submit"
            disabled={optionOneText === "" || optionTwoText === ""}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NewQuestions);
