import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "../App.css";
import { Navbar, SignIn, SignUp, Home } from "./";

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />{/* this will be common in all the pages */}
                    <Route path="/" exact component={Home}/>
                    <Route path="/sign-in" component={SignIn}/>
					<Route path="/sign-up" component={SignUp}/>
				</div>
			</Router>
		);
	}
}

export default App;
