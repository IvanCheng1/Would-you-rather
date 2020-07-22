import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleLogout());
  }

  render() {
    return <Redirect to="/login" />;
  }
}

export default connect()(Logout);
