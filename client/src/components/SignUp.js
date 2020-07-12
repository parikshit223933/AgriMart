import React from "react";

class SignUp extends React.Component {
	render() {
		return (
			<div className="sign-up">
				<div className="container">
					<div className="row">
						<div className="col-xl-8 offset-xl-2 col-md-10 offset-md-2 col-sm-12 bg-light mt-5 p-5 custom-sign-box">
							<h1 className="text-center">Sign Up</h1>
							<form>
                            <div className="form-group">
									<label htmlFor="name">
										Name
									</label>
									<input
										type="text"
										className="form-control"
										id="name"
                                        aria-describedby="name"
                                        placeholder="Enter your name here!"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="email">
										Email address
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
                                        aria-describedby="email"
                                        placeholder="abc@example.com"
									/>
									<small
										id="email"
										className="form-text text-muted"
									>
										We'll never share your email with anyone
										else.
									</small>
								</div>
								<div className="form-group">
									<label htmlFor="password">
										Password
									</label>
									<input
										type="password"
										className="form-control"
                                        id="password"
                                        placeholder="Enter a new password!"
									/>
								</div>
                                <div className="form-group">
									<label htmlFor="confirm-password">
										Confirm Password
									</label>
									<input
										type="password"
										className="form-control"
                                        id="confirm-password"
                                        placeholder="Re-enter your password here!"
									/>
								</div>
								<button type="submit" className="btn btn-primary">
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

export default SignUp;
