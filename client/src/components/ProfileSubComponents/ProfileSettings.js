import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../../actions/auth";
import { ChangePassword, ChangeProfilePicture } from "../";

class ProfileSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sex: "Male"
		};
	}
	handleInputChange = (field, event) => {
		this.setState({
			[field]: event.target.value
		});
	};
	handleSubmit = (event) => {
		const { user } = this.props;
		event.preventDefault();
		this.props.dispatch(updateUser(this.state, user._id));
	};
	render() {
		const { user } = this.props;
		return (
			<div className="pt-3 pr-5">
				<h3 style={{ fontWeight: "400" }}>Edit Public Profile</h3>
				<hr />

				<div className="update-form-container">
					<h4>General</h4>
					<div
						style={{
							height: "2px",
							width: "90px",
							backgroundColor: "#ffa400"
						}}
						className="mb-3"
					></div>
					<div className="high-actions d-flex flex-row justify-content-between align-items-center flex-wrap">
						<ChangePassword userId={user._id} />
						<ChangeProfilePicture
							userId={user._id}
							avatar={user.avatar}
						/>
					</div>
					<form className="mt-3">
						<div className="form-group">
							<label htmlFor="email">
								<b>Email address</b>
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								aria-describedby="emailHelp"
								placeholder="Enter a new Email Address!"
								value={
									this.state.email ||
									(user.email === undefined ? "" : user.email)
								}
								onChange={(event) => {
									this.handleInputChange("email", event);
								}}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="name">
								<b>Name</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								aria-describedby="name"
								value={
									this.state.name ||
									(user.name === undefined ? "" : user.name)
								}
								onChange={(event) => {
									this.handleInputChange("name", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="profession">
								<b>Profession</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="profession"
								aria-describedby="profession"
								value={
									this.state.profession ||
									(user.profession === undefined
										? ""
										: user.profession)
								}
								onChange={(event) => {
									this.handleInputChange("profession", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="homeTown">
								<b>Home Town</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="homeTown"
								aria-describedby="homeTown"
								value={
									this.state.homeTown ||
									(user.homeTown === undefined
										? ""
										: user.homeTown)
								}
								onChange={(event) => {
									this.handleInputChange("homeTown", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="birth">
								<b>Birth Date</b>
							</label>
							<input
								type="date"
								className="form-control"
								id="birth"
								aria-describedby="birth"
								value={
									this.state.birth ||
									(user.birth === undefined ||
									user.birth === null
										? ""
										: user.birth)
								}
								onChange={(event) => {
									this.handleInputChange("birth", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="contact">
								<b>Contact Number</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="contact"
								aria-describedby="contact"
								value={
									this.state.contact ||
									(user.contact === undefined
										? ""
										: user.contact)
								}
								onChange={(event) => {
									this.handleInputChange("contact", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="sex">
								<b>Sex</b>
							</label>
							<select
								className="custom-select my-1 mr-sm-2"
								id="sex"
								onChange={(event) => {
									this.handleInputChange("sex", event);
								}}
							>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
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
							<label htmlFor="facebook-update">
								<b>Facebook Handle</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="facebook-update"
								aria-describedby="facebook-update"
								value={
									this.state.facebook ||
									(user.facebook === undefined
										? ""
										: user.facebook)
								}
								onChange={(event) => {
									this.handleInputChange("facebook", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="instagram-update">
								<b>Instagram Handle</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="instagram-update"
								aria-describedby="instagram-update"
								value={
									this.state.instagram ||
									(user.instagram === undefined
										? ""
										: user.instagram)
								}
								onChange={(event) => {
									this.handleInputChange("instagram", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="google-plus-update">
								<b>Google Plus Handle</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="google-plus-update"
								aria-describedby="google-plus-update"
								value={
									this.state.googlePlus ||
									(user.googlePlus === undefined
										? ""
										: user.googlePlus)
								}
								onChange={(event) => {
									this.handleInputChange("googlePlus", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="twitter-update">
								<b>Twitter Handle</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="twitter-update"
								aria-describedby="twitter-update"
								value={
									this.state.Twitter ||
									(user.Twitter === undefined
										? ""
										: user.Twitter)
								}
								onChange={(event) => {
									this.handleInputChange("Twitter", event);
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="portfolio-update">
								<b>Other Portfolio Link (if any)</b>
							</label>
							<input
								type="text"
								className="form-control"
								id="portfolio-update"
								aria-describedby="portfolio-update"
								value={
									this.state.portfolio ||
									(user.portfolio === undefined
										? ""
										: user.portfolio)
								}
								onChange={(event) => {
									this.handleInputChange("portfolio", event);
								}}
							/>
						</div>
						<button
							type="submit"
							onClick={this.handleSubmit}
							className="btn btn-primary"
						>
							Update
						</button>
					</form>
				</div>
			</div>
		);
	}
}
export default connect()(ProfileSettings);
