import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getAuthTokenFromStorage } from "../helpers/utils";
import { connect } from "react-redux";
import { authenticateUser } from "../actions/auth";
import "../App.css";

import
    {
        Navbar,
        SignIn,
        SignUp,
        Home,
        Cart,
        Page404,
        Profile,
        Categories,
        Sell,
        MoreInfo,
        EditProduct,
        SingleProduct,
        SingleCategory,
        CheckOutForm,
        PrivateRoute,
        RestrictedRoute
    } from "./";

// call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const STRIPE_PUBLISH_KEY = "pk_test_51H9F89HyvUiMKHjejfcy7c0VYxb3a7AvYvCwQ9H7zx00NJpIThu90qwueiPRXsH9j0bfe7sGHWKTe1JWDDAU0ked00l1v3ppVd";
const stripePromise = loadStripe(STRIPE_PUBLISH_KEY); //configure the Stripe library

class App extends React.Component
{
    componentDidMount()
    {
        const token = getAuthTokenFromStorage();
        if (token)
        {
            const user = jwtDecode(token);
            this.props.dispatch(authenticateUser({ ...user }));
        }
    }
    render()
    {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <PrivateRoute path="/profile" exact component={Profile} />
                        <RestrictedRoute path="/sign-in" component={SignIn} />
                        <RestrictedRoute path="/sign-up" component={SignUp} />
                        <PrivateRoute path="/cart" component={Cart} />
                        <Route exact path="/categories" component={Categories} />
                        <PrivateRoute path="/sell" component={Sell} />
                        <Route path="/more-info" component={MoreInfo} />
                        <PrivateRoute
                            path="/edit-product/:productId/:userId"
                            component={EditProduct}
                        />
                        <PrivateRoute
                            path="/view-product/:productId/:userId"
                            component={SingleProduct}
                        />
                        <Route path="/categories/:category" component={SingleCategory} />
                        <PrivateRoute path="/checkout">
                            <Elements stripe={stripePromise}>
                                <CheckOutForm />
                            </Elements>
                        </PrivateRoute>
                        <Route component={Page404} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps({ auth })
{
    return { auth };
}

export default connect(mapStateToProps)(App);
