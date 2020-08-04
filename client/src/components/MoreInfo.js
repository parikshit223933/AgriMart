import React from "react";
import "../info.css";
import tushar from "../images/tushar.jpg";
import cpd from "../images/chandra.jpg";
import parikshit from "../images/parikshit.jpg";
import {API_URLS} from '../helpers/urls';
import { showNotification, getFormBody } from "../helpers/utils";

class MoreInfo extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            message:'',
            email:'',
            subject:''
        }
    }
    handleInputChange=(event, field)=>
    {
        this.setState({
            [field]:event.target.value
        })
    }
    handleSubmit=(event)=>
    {
        event.preventDefault();
        fetch(API_URLS.sendMessage(), {
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
                    showNotification(data.data.message, 1500, 'success');
                }
                else
                {
                    showNotification(data.message, 1500, 'error');
                }
            })
    }
    render()
    {
        console.log(this.state);
        return (
            <div className="more-info-component">
                <div className="container-fluid p-0">
                    <header className="info-header text-center">
                        <span className="display-1 small-screen-display">
                            Agrimart<sup>Info</sup>
                        </span>
                    </header>
                    <div className="info-contributors text-center pb-4">
                        <p className="display-4 pt-4">Developers</p>
                        <div
                            className="row w-100"
                            style={{ paddingLeft: "2rem" }}
                        >

                            <div className="col-lg-4 d-flex flex-row justify-content-center align-items-center">
                                <div
                                    className="card mt-4 mb-4"
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "50% 50% 0 0"
                                    }}
                                >
                                    <div
                                        className="mx-auto"
                                        style={{
                                            width: 286,
                                            height: 286,
                                            backgroundImage: `url(${parikshit})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            borderRadius: "50%"
                                        }}
                                    ></div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            <b>Parikshit Singh</b> Is a Mern
											Stack Developer with strong Node Js
											and React concepts. He has built
											multiple Mern Stack Applications
											including SocialOrzix, ReactivePod,
											and many other small applications
											too. Focused and concerned about
											every small detail, Parikshit keeps
											a Hawk eye on security
											vulnerabilities and particularly
											concerned about the data that is
											exposed to the user. He has
											Contributed to the Front and
											Back-end of Agrimart Significantly.
										</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex flex-row justify-content-center align-items-center">
                                <div
                                    className="card mt-4 mb-4"
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "50% 50% 0 0"
                                    }}
                                >
                                    <div
                                        className="mx-auto"
                                        style={{
                                            width: 286,
                                            height: 286,
                                            backgroundImage: `url(${tushar})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            borderRadius: "50%"
                                        }}
                                    ></div>

                                    <div className="card-body">
                                        <p className="card-text">
                                            <b>Tushar Sharma</b> is a creative
											and focused Web Developer dedicated
											to developing and optimizing
											interactive, user-friendly and
											Feature-rich Websites. He has
											created several Full Stack Projects
											with React JS and Contributed to
											Agrimart Significantly using his
											Backend Web Development Skills under
											the hood! Moreover Tushar is very
											particular about every minor defect
											whether it is a visual discrepancy
											or server bug.
										</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex flex-row justify-content-center align-items-center">
                                <div
                                    className="card mt-4 mb-4"
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "50% 50% 0 0"
                                    }}
                                >
                                    <div
                                        className="mx-auto"
                                        style={{
                                            width: 286,
                                            height: 286,
                                            backgroundImage: `url(${cpd})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            borderRadius: "50%"
                                        }}
                                    ></div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            <b>Chandra Prakash Dubey</b> is a
											determined and productive web
											developer with a passion for
											creative solutions. Apart from this
											He is very proficient in C++ and
											very good at suggesting appropriate
											data structures for any task.
											Dedicated to learning additional
											technologies and contributing to the
											open Source, He has contributed to
											Agrimart very significantly handling
											the back-end part of the code.
										</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-about-us text-center pb-5">
                        <p className="display-4 pt-4">About us</p>
                        <div
                            className="row w-100"
                            style={{ paddingLeft: "2rem" }}
                        >
                            <div
                                className="col-md-8 offset-md-2 about-us-content p-4"
                                style={{ fontSize: "20px" }}
                            >
                                Welcome to Agrimart, your number one source for
                                all your agricultural needs. We're dedicated to
                                giving you the very best of all services, with a
                                highly converged focus on hygine, good customer
                                service and uniqueness under the hood. Agrimart
                                was founded in 2020 by {" "} 
								<b>Parikshit Singh</b>, <b>Tushar Sharma</b> and{" "}
                                <b>Chandra Prakash Dubey</b>. We hope you enjoy
								our products and services as much as we enjoy
								offering them to you. If you have any questions
								or comments, please don't hesitate to contact
								us.
							</div>
                        </div>
                    </div>
                    <div className="info-contact-us pb-4">
                        <p className="display-4 pt-4 text-center">Contact Us</p>
                        <div
                            className="row w-100"
                            style={{ paddingLeft: "2rem" }}
                        >
                            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 contact-us-body p-5">
                                {/* body={email, subject, message} */}
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="emailinput">
                                            <b>Email address</b>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="emailinput"
                                            aria-describedby="emailHelp"
                                            value={this.state.email}
                                            onChange={(event)=>this.handleInputChange(event, 'email')}
                                        />
                                        <small
                                            id="emailHelp"
                                            className="form-text text-muted"
                                        >
                                            We'll never share your email with
                                            anyone else.
										</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subjectinput">
                                            <b>Subject</b>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subjectinput"
                                            aria-describedby="emailHelp"
                                            value={this.state.subject}
                                            onChange={(event)=>this.handleInputChange(event, 'subject')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="messageArea">
                                            <b>Message</b>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Type your message here..."
                                            id="messageArea"
                                            rows="5"
                                            value={this.state.message}
                                            onChange={(event)=>this.handleInputChange(event, 'message')}
                                        ></textarea>
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
            </div>
        );
    }
}

export default MoreInfo;
