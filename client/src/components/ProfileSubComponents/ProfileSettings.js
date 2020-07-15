import React from "react";

class ProfileSettings extends React.Component {
	render() {
		return (
			<div className="pt-3 pr-5">
				<h3 style={{ fontWeight: "400" }}>Edit Public Profile</h3>
				<hr />

				<div className="update-form-container">
					<form>
						<h4>General</h4>
						<div
							style={{
								height: "2px",
								width: "90px",
								backgroundColor: "#ffa400"
							}}
							className="mb-3"
						></div>
						<div className="form-group">
							<label htmlFor="email">Email address</label>
							<input
								type="email"
								className="form-control"
								id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter a new Email Address!"
							/>
						</div>
						<div className="high-actions d-flex flex-row justify-content-between align-items-center">
							<div className="form-group">
								<button type="button" className="btn btn-danger">
									Change Password
								</button>
							</div>
							<div className="form-group">
								<button type="button" className="btn btn-success">
									Change Profile Picture
								</button>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
                                aria-describedby="name"
                                placeholder="Enter a new name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="profession">Profession</label>
							<input
								type="text"
								className="form-control"
								id="profession"
                                aria-describedby="profession"
                                placeholder="Enter a Profession"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="homeTown">Home Town</label>
							<input
								type="text"
								className="form-control"
								id="homeTown"
                                aria-describedby="homeTown"
                                placeholder="Enter your home town"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="birth">Birth Date</label>
							<input
								type="date"
								className="form-control"
								id="birth"
                                aria-describedby="birth"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="contact">Contact Number</label>
							<input
								type="text"
								className="form-control"
								id="contact"
                                aria-describedby="contact"
                                placeholder="Enter a Contact Number"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="sex">Sex</label>
							<select className="custom-select my-1 mr-sm-2" id="sex">
								<option value="Male">Male</option>
								<option value="Female">FeMale</option>
								<option value="Other">Other</option>
							</select>
							<small className="form-text text-muted">
								We'll use this information only for statistical
								purposes.
							</small>
						</div>
						<h4>Social</h4>
						<div
							style={{
								height: "2px",
								width: "90px",
								backgroundColor: "#ffa400"
							}}
							className="mb-3"
						></div>
						{/* ////////////////////////// UPDATE SOCIAL MEDIA LINKS //////////////////////////// */}
						<div className="form-group">
							<label htmlFor="facebook-update">Facebook Link</label>
							<input
								type="text"
								className="form-control"
								id="facebook-update"
                                aria-describedby="facebook-update"
                                placeholder="Enter your Facebook Profile Link"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="instagram-update">Instagram Link</label>
							<input
								type="text"
								className="form-control"
								id="instagram-update"
                                aria-describedby="instagram-update"
                                placeholder="Enter your Instagram Profile Link"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="google-plus-update">
								Google Plus Link
							</label>
							<input
								type="text"
								className="form-control"
								id="google-plus-update"
                                aria-describedby="google-plus-update"
                                placeholder="Enter Your Google Plus Profile Link"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="twitter-update">Twitter Link</label>
							<input
								type="text"
								className="form-control"
								id="twitter-update"
                                aria-describedby="twitter-update"
                                placeholder="Enter Your Twitter Handle"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="portfolio-update">
								Other Portfolio Link (if any)
							</label>
							<input
								type="text"
								className="form-control"
								id="portfolio-update"
                                aria-describedby="portfolio-update"
                                placeholder="Enter your own portfolio profile link"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Update
						</button>
					</form>
				</div>
			</div>
		);
	}
}
export default ProfileSettings;
