import React from "react";

class SignIn extends React.Component {
	render() {
		return (
			<div className="sign-in">
				<div className="container">
					<div className="row">
						<div className="col-xl-8 offset-xl-2 col-md-10 offset-md-2 col-sm-12 bg-light mt-5 p-5 custom-sign-box">
							<h1 className="text-center">Sign In</h1>
							<form>
								<div className="form-group">
									<label htmlFor="email">Email address</label>
									<input
										type="email"
										className="form-control"
										id="email"
										aria-describedby="email"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										className="form-control"
                                        id="password"
                                        placeholder="Enter your password here!"
									/>
								</div>
								<button
									type="submit"
									className="btn btn-primary"
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SignIn;
