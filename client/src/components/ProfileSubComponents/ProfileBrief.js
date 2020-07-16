import React from "react";
import { connect } from "react-redux";
import dateformat from "dateformat";

class ProfileBrief extends React.Component {
	render() {
		const { user } = this.props.auth;
		return (
			<div className="col-sm-5 col-lg-4">
				<div className="user-profile-image ml-auto mr-auto mt-4 mb-4">
					<img
						src={
							!user.avatar
								? user.sex === "Male"
									? "https://www.freeiconspng.com/uploads/flat-user-icon-11.png"
									: "https://www.pinclipart.com/picdir/big/164-1640717_free-user-icon-flat-189024-download-user-icon.png"
								: user.avatar
						}
						alt="profile"
					/>
				</div>

				<div className="left-section">
					<h5 className="text-dark">
						<i className="fas fa-user-tie"></i> Profession
					</h5>
					<div className="hl one"></div>
					<p>{!user.profession ? "Not Added!" : user.profession}</p>
				</div>
				<div className="left-section">
					<h5 className="text-dark">
						<i className="fas fa-map-marked"></i> Home Town
					</h5>
					<div className="hl one"></div>
					<p>{!user.homeTown ? "Not Added!" : user.homeTown}</p>
				</div>
				<div className="left-section">
					<h5 className="text-dark">
						<i className="fas fa-address-card"></i> About Me
					</h5>
					<div className="hl one"></div>
					<div>
						<div>
							<b className="text-muted">Born on: </b>
							<span>
								{!user.birth
									? "Not Added!"
									: dateformat(user.birth, `dd mmmm yyyy`)}
							</span>
						</div>
						<div>
							<b className="text-muted">Joined on: </b>
							<span>
								{dateformat(user.createdAt, `dd mmmm yyyy`)}
							</span>
						</div>
						<div>
							<b className="text-muted">Email Address: </b>
							<span>{user.email}</span>
						</div>
						<div>
							<b className="text-muted">Contact Number: </b>
							<span>
								{!user.contact ? "Not Added!" : user.contact}
							</span>
						</div>
					</div>
				</div>
				<div className="left-section mt-3">
					<h5 className="text-dark">
						<i className="fas fa-people-arrows"></i> Social Handles
					</h5>
					<div className="hl one"></div>
					{user.portfolio ||
					user.facebook ||
					user.googlePlus ||
					user.twitter ||
					user.instagram ? (
						<div className="social-handle-container">
							{!user.facebook ? null : (
								<a href={user.facebook} target="blank">
									<div className="facebook-handle">
										<i className="fab fa-facebook"></i>
									</div>
								</a>
							)}
							{!user.instagram ? null : (
								<a href={user.instagram} target="blank">
									<div className="instagram-handle">
										<i className="fab fa-instagram"></i>
									</div>
								</a>
							)}
							{!user.googlePlus ? null : (
								<a href={user.googlePlus} target="blank">
									<div className="google-handle">
										<i className="fab fa-google-plus-g"></i>
									</div>
								</a>
							)}
							{!user.twitter ? null : (
								<a href={user.twitter} target="blank">
									<div className="twitter-handle">
										<i className="fab fa-twitter"></i>
									</div>
								</a>
							)}
							{!user.portfolio ? null : (
								<a href={user.portfolio} target="blank">
									<div className="portfolio">
										<i className="fas fa-user-tie"></i>
									</div>
								</a>
							)}
						</div>
					) : (
						<div className="social-handle-container">
							<h6>No Social Handles Added!</h6>
						</div>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(ProfileBrief);
