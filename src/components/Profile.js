import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state, { user }) {
  return {
    user,
  };
}

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="profile">
        <div className="profile-name">{user.name}</div>
        <div className="profile-info">
          <img
            src={user.avatarURL}
            alt={`Avatar of ${user.name}`}
            className="avatar"
          />

          <ul>
            <li>Asked: {user.questionScore} questions</li>
            <li>Answered: {user.answerScore} questions</li>
          </ul>
          <div className="total-score">
            <div className="total-score-label">Total score</div>
            <div className="total-score-number">{user.totalScore}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);
