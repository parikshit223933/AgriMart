import React from 'react';
import { API_URLS } from '../helpers/urls';
import { getFormBody, showNotification } from '../helpers/utils';

class ResetPassword extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            confirmPassword: '',
            newPassword: ''
        }
    }
    handleInputChange = (event, field) =>
    {
        this.setState({
            [field]: event.target.value
        });
    }
    handleSubmit = (event) =>
    {
        event.preventDefault();
        let url = API_URLS.resetPassword();
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: getFormBody({...this.state, token:this.props.computedMatch.params.token})
        })
            .then(response => response.json())
            .then(data =>
            {
                if (data.success)
                    showNotification(data.data.message, 2000, 'success');
                else
                    showNotification(data.message, 1500, 'error');
            })
    }
    render()
    {
        return (
            <div className="forgot-password">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2 col-md-10 offset-md-1 col-sm-12 bg-light mt-5 p-5 custom-sign-box">
                            <h1 className="text-center mb-4">Reset Your Password</h1>

                            <form>
                                <div className="form-group">
                                    <label htmlFor="password">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        aria-describedby="password"
                                        required
                                        onChange={(event) => this.handleInputChange(event, 'newPassword')}
                                        value={this.state.newPassword}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        aria-describedby="confirmPassword"
                                        required
                                        onChange={(event) => this.handleInputChange(event, 'confirmPassword')}
                                        value={this.state.confirmPassword}
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
export default ResetPassword;