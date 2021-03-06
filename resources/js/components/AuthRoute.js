import { Redirect, Route } from "react-router";
import React from "react";
import cookie from "js-cookie";
import login from "../pages/auth/login";
import { connect } from "react-redux";
import axios from 'axios'

const AuthRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                 rest.loggedIn ? (
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
};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps)(AuthRoute);
