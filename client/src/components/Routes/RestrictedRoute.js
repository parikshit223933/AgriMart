import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RestrictedRoute = ({ component: Component, ...rest }) =>
{
    const isLoggedin = localStorage.getItem('token');
    return (
        // Show the component only when the user is logged out
        // Otherwise, redirect the user to home page
        // ...rest destructure the props of route
        <Route {...rest} render={props => !isLoggedin ? ( <Component {...rest} /> ) : ( <Redirect to={{ pathname: "/", state: { from: props.location } }} /> ) } />
    );
}

export default RestrictedRoute;