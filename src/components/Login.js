import React, { Component } from "react";
import { connect } from "react-redux";
import { handleGetUsers } from "../actions/users";
import { handleLogin } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

function mapStateToProps({ users, authedUser }) {
  // console.log("authedUser:", authedUser)
  return {
    users,
    authedUser,
  };
}

class Login extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetUsers());
  }

  state = {
    selectUser: "choose",
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      selectUser: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(handleLogin(this.state.selectUser));
  };

  render() {
    const { users } = this.props;

    const userList = Object.values(users);

    if (this.props.authedUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="sign-in-card">
        <div className="sign-in-welcome">
          <h2>Welcome to the Would You Rather App!</h2>
          <span>Please sign in to continue</span>
        </div>

        <form onSubmit={this.handleSubmit} className="sign-in-form">
          <select
            value={this.state.selectUser}
            onChange={this.handleChange}
            className="sign-in-user"
          >
            <option value="choose" disabled>
              Choose a user...
            </option>

            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="btn"
            disabled={this.state.selectUser === "choose"}
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
