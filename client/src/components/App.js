import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

import "../App.css";
import {
	Navbar,
	SignIn,
	SignUp,
	Home,
	Cart,
	Page404,
	Profile,
	Categories,
	Sell,
	MoreInfo
} from "./";
import { getAuthTokenFromStorage } from "../helpers/utils";
import { connect } from "react-redux";
import { authenticateUser } from "../actions/auth";

class App extends React.Component {
	componentDidMount() {
		const token = getAuthTokenFromStorage();
		if (token) {
			const user = jwtDecode(token);
			this.props.dispatch(
				authenticateUser({...user})
			);
		}
	}
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/profile" exact component={Profile} />
						<Route path="/sign-in" component={SignIn} />
						<Route path="/sign-up" component={SignUp} />
						<Route path="/cart" component={Cart} />
						<Route path="/categories" component={Categories} />
						<Route path="/sell" component={Sell} />
						<Route path="/sell" component={Sell} />
						<Route path="/more-info" component={MoreInfo} />
						<Route component={Page404} />
					</Switch>
				</div>
			</Router>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(App);
