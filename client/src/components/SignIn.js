import React from "react";
import { connect } from "react-redux";
import { login, clearAuthState } from "../actions/auth";
import { showNotification } from "../helpers/utils";
import {Link} from 'react-router-dom';

class SignIn extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
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
    handleSubmit = (event) =>
    {
        event.preventDefault();

        const { email, password } = this.state;
        if (email && password)
        {
            this.props.dispatch(login(email, password));
        }
    };
    componentDidMount()
    {
        const { success } = this.props.auth;
        if(success)
        {
            showNotification(success, 2000, 'success')
            this.props.dispatch(clearAuthState());
        }
    }
    componentDidUpdate(prevProps, prevState)
    {
        const { error } = this.props.auth;
        if(error)
        {
            showNotification(error, 2000, 'error')
            this.props.dispatch(clearAuthState());
        }
        
    }
    render()
    {
        const { inProgress } = this.props.auth;
        if (inProgress)
        {
            return (
				<div
					style={{ height: "100vh", width: "100vh" }}
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
            <div className="sign-in">
                <div className="container animate__animated animate__fadeInLeft">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2 col-md-10 offset-md-1 col-sm-12 bg-light mt-5 p-5 custom-sign-box">
                            <h1 className="text-center">Sign In</h1>

                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="email"
                                        onChange={this.handleEmailChange}
                                        value={this.state.email}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password here!"
                                        onChange={this.handlePasswordChange}
                                        value={this.state.password}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <Link to="/forgot-password">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.handleSubmit}
                                    disabled={inProgress}
                                >
                                    Submit
								</button>
                                {inProgress && (
                                    <div
                                        className="loader-small"
                                        style={{ display: "inline-block" }}
                                    ></div>
                                )}
                            </form>
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

export default connect(mapStateToProps)(SignIn);
