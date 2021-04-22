import { Redirect, Route } from "react-router";
import React from 'react'
import cookie from 'js-cookie'
import login from "../pages/login";
import {connect} from 'react-redux'

const AuthRoute = ({ component: Component, ...rest })=> {

    const token = cookie.get('token')
    return (
      <Route
        {...rest}
        render={props =>
          rest.loggedIn ? (
              <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/tok",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    };
  };
  export default connect(
    mapStateToProps
  )(AuthRoute);

