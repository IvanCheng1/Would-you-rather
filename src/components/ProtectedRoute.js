import React from "react";
import { Route, Redirect } from "react-router-dom";

// source: https://ui.dev/react-router-v4-protected-routes-authentication/

const ProtectedRoute = ({ component: Component, authedUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authedUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
