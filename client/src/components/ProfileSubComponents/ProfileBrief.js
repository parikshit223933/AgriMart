import React from "react";

class ProfileBrief extends React.Component {
	render() {
		return (
			<div className="col-sm-5 col-lg-4">
				<div className="user-profile-image ml-auto mr-auto mt-4 mb-4">
					<img
						src="https://cdn.vox-cdn.com/thumbor/AKlw-Pv8X7FSm-abHvxidrw78yo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19983517/520557826.jpg.jpg"
						alt="profile"
					/>
				</div>

				<div className="left-section">
					<h5 className="text-dark">
						<i className="fas fa-user-tie"></i> Profession
					</h5>
					<div className="hl one"></div>
					<p>Farmer | Labour</p>
				</div>
				<div className="left-section">
					<h5 className="text-dark">
						<i className="fas fa-map-marked"></i> Home Town
					</h5>
					<div className="hl one"></div>
					<p>Rampur, UttarPradesh, India</p>
				</div>
				<div className="left-section">
					<h5 className="text-dark">
						<i className="fas fa-address-card"></i> About Me
					</h5>
					<div className="hl one"></div>
					<div>
						<div>
							<b className="text-muted">Born on: </b>
							<span>1 April 1999</span>
						</div>
						<div>
							<b className="text-muted">Joined on: </b>
							<span>1 July 2020</span>
						</div>
						<div>
							<b className="text-muted">Email Address: </b>
							<span>1 April 1999</span>
						</div>
						<div>
							<b className="text-muted">Contact Number: </b>
							<span>1 April 1999</span>
						</div>
					</div>
				</div>
				<div className="left-section mt-3">
					<h5 className="text-dark">
						<i className="fas fa-people-arrows"></i> Social Handles
					</h5>
					<div className="hl one"></div>
					<div className="social-handle-container">
						<div className="facebook-handle">
							<i className="fab fa-facebook"></i>
						</div>
						<div className="instagram-handle">
							<i className="fab fa-instagram"></i>
						</div>
						<div className="google-handle">
							<i className="fab fa-google-plus-g"></i>
						</div>
						<div className="twitter-handle">
							<i className="fab fa-twitter"></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ProfileBrief;