import React from 'react';

class ForgotPassword extends React.Component
{
    render()
    {
        return(
            <div className="forgot-password">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2 col-md-10 offset-md-1 col-sm-12 bg-light mt-5 p-5 custom-sign-box">
                            <h1 className="text-center mb-4">Forgot Password</h1>

                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="email"
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;