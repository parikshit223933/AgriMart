import React from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import "../Profile.css";

class Profile extends React.Component {
	componentDidMount() {
		this.profilePhotoHeightHandler();
	}
	profilePhotoHeightHandler = () => {
		let img = $("user-profile-image>img");
		img.height(img.width());
	};
	render() {
		return (
			<div className="profile-component bg-warning">
				<div className="container bg-light pb-5">
					<div className="row pl-2 pr-2">
						<div className="col-sm-5 col-lg-4">
							<div className="user-profile-image ml-auto mr-auto mt-4 mb-4">
								<img
									src="https://cdn.vox-cdn.com/thumbor/AKlw-Pv8X7FSm-abHvxidrw78yo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19983517/520557826.jpg.jpg"
									alt="profile"
								/>
							</div>
							<div className="name-section">
								<h2 className="text-center">Ramu Kaka</h2>
							</div>
							<div className="left-section">
								<h5 className="text-dark">Profession</h5>
								<div className="hl one"></div>
								<p>Farmer | Labour</p>
							</div>
							<div className="left-section">
								<h5 className="text-dark">Home Town</h5>
								<div className="hl one"></div>
								<p>Rampur, UttarPradesh, India</p>
							</div>
							<div className="left-section">
								<h5 className="text-dark">About Me</h5>
								<div className="hl one"></div>
								<p>
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
								</p>
							</div>
							<div className="left-section">
								<h5 className="text-dark">
									Social Handles
								</h5>
								<div className="hl one"></div>
								<div className="social-handle-container">
									<div className="facebook-handle">
										<i class="fab fa-facebook"></i>
									</div>
									<div className="instagram-handle">
										<i class="fab fa-instagram"></i>
									</div>
									<div className="google-handle">
										<i class="fab fa-google-plus-g"></i>
									</div>
									<div className="twitter-handle">
										<i class="fab fa-twitter"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps({ product, auth }) {
	return {
		product,
		auth
	};
}
export default connect(mapStateToProps)(Profile);
