import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) =>
{
    const isLoggedin = localStorage.getItem('token');
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        // ...rest destructure the props of route
        <Route {...rest}
            render={props =>
                isLoggedin ? (
                    <Component />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/sign-in",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;