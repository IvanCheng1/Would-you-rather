import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

function mapStateToProps({ users }, { authedUser }) {
  return {
    users,
    authedUser,
  };
}

class Nav extends Component {
  render() {
    const { users, authedUser } = this.props;

    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" exact activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" exact activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
        </ul>
        <ul className="login">
          <li>
            <span>Hello, {users[authedUser].name}</span>
          </li>
          <li>
            <NavLink to="/logout" exact activeClassName="active">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect(mapStateToProps)(Nav);
