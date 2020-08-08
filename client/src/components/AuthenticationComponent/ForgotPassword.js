import React from 'react';
import { API_URLS } from '../../helpers/urls';
import { showNotification, getFormBody } from '../../helpers/utils';

class ForgotPassword extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            email:'',
        }
    }
    handleInputChange=(event)=>
    {
        this.setState({
            email:event.target.value
        });
    }
    handleSubmit=(event)=>
    {
        event.preventDefault()
        fetch(API_URLS.forgotPassword(), {
            method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
            body: getFormBody(this.state)
        })
        .then(response=>response.json())
        .then(data=>
            {
                if(data.success)
                {
                    showNotification(data.data.message, 3000, 'success');
                }
                else
                {
                    showNotification(data.message, 2000, 'error');
                }
            });
    }
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
                                        placeholder='abc@xyz.com'
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.handleSubmit}
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