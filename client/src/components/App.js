import React from "react";

import "../App.css";
import { Navbar, SignIn, SignUp } from "./";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Navbar />
                <SignUp/>
			</div>
		);
	}
}

export default App;
