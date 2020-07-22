import React, { Component } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";

function mapStateToProps({ users }) {
  return {
    users,
  };
}

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    let sortedUsers = [];

    for (let value of Object.values(users)) {
      let user = {};

      user.id = value.id;
      user.name = value.name;
      user.avatarURL = value.avatarURL;
      user.answerScore = Object.values(value.answers).length;
      user.questionScore = value.questions.length;
      user.totalScore = user.answerScore + user.questionScore;

      sortedUsers.push(user);
    }

    sortedUsers.sort((a, b) => b.totalScore - a.totalScore);

    return (
      <div className="leaderboard">
        {sortedUsers.map((user) => (
          <Profile key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Leaderboard);
