import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

class Logout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleLogout());
  }

  render() {
    return <div></div>;
  }
}

export default connect()(Logout);
