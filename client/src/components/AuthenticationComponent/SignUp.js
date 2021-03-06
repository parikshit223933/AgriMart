import React from "react";
import { connect } from "react-redux";
import { clearAuthState, signUp, OAuth } from "../../actions/auth";
import { showNotification } from "../../helpers/utils";
import GoogleLogin from "react-google-login";

/* 
SIGN UP ACTION WORKING PRINCIPLE:
    INITIALLY THE SIGN UP START ACTION WILL BE CALLED AS A RESULT OF WHICH INPROGRESS PROPS WILL BE SWITCHED TO TRUE
    NOW IF THE SIGN UP IS SUCCESSFUL, THEN SIGNUP ACTION WILL CALLED THE LOGIN FUNCTION PASSING IT THE EMAIL ANS PASSWORD OF THE USER.
    THE LOGIN FUNCTION WILL IN TURN CALL THREE OTHER FUNCTIONS NAMELY, LOGINSTART, LOGIN FAILURE/SUCCESS (AS THE CASE MAY BE)
    IF THE IF THE LOGIN IS SUCCESSFUL THEN THE USER WILL BE REDIRECTED TO THE HOME PAGE AND IF IT FAILS, THEN LOGIN FAILED ACTION WILL BE CALLED.
    IF THE SIGN UP ACTION FAILS, THEN THE SIGNUPFAILED ACTION WILL BE CALLED.
*/

class SignUp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        };
    }
    componentWillUnmount()
    {
        this.props.dispatch(clearAuthState()); //setting error=null when navigating away from the sign up page
    }
    handleNameChange = (event) =>
    {
        this.setState({
            name: event.target.value
        });
    };
    handleEmailChange = (event) =>
    {
        this.setState({
            email: event.target.value
        });
    };
    handlePasswordChange = (event) =>
    {
        this.setState({
            password: event.target.value
        });
    };
    handleConfirmPasswordChange = (event) =>
    {
        this.setState({
            confirm_password: event.target.value
        });
    };
    handleSubmit = (event) =>
    {
        event.preventDefault();
        const { name, email, password, confirm_password } = this.state;
        this.props.dispatch(signUp(name, email, password, confirm_password));
    };
    componentDidUpdate(prevProps, prevState)
    {
        const {error}=this.props.auth;
        if(error)
        {
            showNotification(error, 1500, 'error');
            this.props.dispatch(clearAuthState())
        }
    }
    handleGoogleLoginOnFailure=(error, details)=>
    {
        console.log(error, details);
        return;
    }
    handleGoogleLoginOnSuccess=(user)=>
    {
        this.props.dispatch(OAuth(user.profileObj.name, user.profileObj.email))
    }
    render()
    {
        if (this.props.auth.inProgress)
        {
            return (
				<div
					style={{ height: "100vh", width: "100%" }}
					className="d-flex flex-column justify-content-center align-items-center ml-auto mr-auto"
				>
					<div
						className="spinner-border text-danger"
						role="status"
						style={{ width: "10rem", height: "10rem" }}
					>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
        }
        return (
            <div className="sign-up">
                <div className="container animate__animated animate__fadeInLeft">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2 col-md-10 offset-md-2 col-sm-12 bg-light mt-5 p-5 custom-sign-box">
                            <h1 className="text-center">Sign Up</h1>
                            
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        aria-describedby="name"
                                        placeholder="Enter your name here!"
                                        onChange={this.handleNameChange}
                                        value={this.state.name}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="email"
                                        placeholder="abc@example.com"
                                        onChange={this.handleEmailChange}
                                        value={this.state.email}
                                        required
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
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter a new password!"
                                        onChange={this.handlePasswordChange}
                                        value={this.state.password}
                                        required
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
                                        onChange={
                                            this.handleConfirmPasswordChange
                                        }
                                        value={this.state.confirm_password}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
								</button>
                            </form>
                            <div className="mt-2" style={{fontWeight:'bolder'}}>
                                OR
                            </div>
                            <div className="mt-2">
							    <GoogleLogin
    								clientId="1014305949901-lrutgs7it8n0mr8hqh3456cqsv14lusl.apps.googleusercontent.com"
    								onSuccess={this.handleGoogleLoginOnSuccess}
    								onFailure={this.handleGoogleLoginOnFailure}
                                    cookiePolicy={"single_host_origin"}
                                    theme={'dark'}
    							/>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps({ auth })
{
    return { auth };
}
export default connect(mapStateToProps)(SignUp);
