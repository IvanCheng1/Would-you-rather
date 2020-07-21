import React, { Component } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";

function mapStateToProps({ users }) {
  return {
    users,
  };
}

// return {
//   questionIds: Object.keys(questions).sort(
//     (a, b) => questions[b].timestamp - questions[a].timestamp
//   ),
// };

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    // console.log("USERS", users)

    let sortedUsers = [];

    for (let [key, value] of Object.entries(users)) {
      let user = {};

      user.id = value.id;
      user.name = value.name;
      user.avatarURL = value.avatarURL;
      user.answerScore = Object.values(value.answers).length;
      user.questionScore = value.questions.length;
      user.totalScore = user.answerScore + user.questionScore;

      // console.log(user)
      sortedUsers.push(user);
    }

    sortedUsers.sort((a, b) => b.totalScore - a.totalScore);

    console.log(sortedUsers);

    return (
      <div>
        {sortedUsers.map((user) => (
          <Profile key={user.id} user={user}/>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Leaderboard);
