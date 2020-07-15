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

							<div className="left-section">
								<h5 className="text-dark">
									<i className="fas fa-user-tie"></i>{" "}
									Profession
								</h5>
								<div className="hl one"></div>
								<p>Farmer | Labour</p>
							</div>
							<div className="left-section">
								<h5 className="text-dark">
									<i className="fas fa-map-marked"></i> Home
									Town
								</h5>
								<div className="hl one"></div>
								<p>Rampur, UttarPradesh, India</p>
							</div>
							<div className="left-section">
								<h5 className="text-dark">
									<i className="fas fa-address-card"></i>{" "}
									About Me
								</h5>
								<div className="hl one"></div>
								<div>
									<div>
										<b className="text-muted">Born on: </b>
										<span>1 April 1999</span>
									</div>
									<div>
										<b className="text-muted">
											Joined on:{" "}
										</b>
										<span>1 July 2020</span>
									</div>
									<div>
										<b className="text-muted">
											Email Address:{" "}
										</b>
										<span>1 April 1999</span>
									</div>
									<div>
										<b className="text-muted">
											Contact Number:{" "}
										</b>
										<span>1 April 1999</span>
									</div>
								</div>
							</div>
							<div className="left-section mt-3">
								<h5 className="text-dark">
									<i className="fas fa-people-arrows"></i>{" "}
									Social Handles
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
						<div className="col-sm-7 col-lg-8 mt-2">
							<div className="profile-top">
								<div className="title-name mt-3">
									<h1>John Wick</h1>
									<div className="hl two"></div>
								</div>
								<div className="name-subtitle">
									<h4>
										<i className="fas fa-check"></i> Trusted
									</h4>
								</div>
								<div className="bookmark">
									<button
										type="button"
										className="btn btn-light"
									>
										<i className="fas fa-bookmark text-secondary"></i>{" "}
										Bookmark
									</button>
								</div>
								<div className="rankings">
									<p className="text-muted rating mb-0 mt-4">
										Rating
									</p>
									<div className="stars">
										<span>860 Upvotes</span>{" "}
										<i className="fas fa-star"></i>
										<i className="fas fa-star"></i>
										<i className="fas fa-star"></i>
										<i className="fas fa-star"></i>
										<i className="fas fa-star-half-alt"></i>
									</div>
								</div>
							</div>
							<div className="profile-bottom mt-5">
								<ul
									className="nav nav-tabs"
									id="myTab"
									role="tablist"
								>
									<li
										className="nav-item"
										role="presentation"
									>
										<a
											className="nav-link active bg-light"
											id="home-tab"
											data-toggle="tab"
											href="#home"
											role="tab"
											aria-controls="home"
											aria-selected="true"
										>
											sold
										</a>
									</li>
									<li
										className="nav-item"
										role="presentation"
									>
										<a
											className="nav-link bg-light"
											id="profile-tab"
											data-toggle="tab"
											href="#profile"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											Unsold
										</a>
									</li>
									<li
										className="nav-item"
										role="presentation"
									>
										<a
											className="nav-link bg-light"
											id="contact-tab"
											data-toggle="tab"
											href="#contact"
											role="tab"
											aria-controls="contact"
											aria-selected="false"
										>
											Purchase History
										</a>
									</li>
								</ul>
								<div className="tab-content" id="myTabContent">
									<div
										className="tab-pane fade show active"
										id="home"
										role="tabpanel"
										aria-labelledby="home-tab"
									>
										sold items here
									</div>
									<div
										className="tab-pane fade"
										id="profile"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
										unsold items hee
									</div>
									<div
										className="tab-pane fade"
										id="contact"
										role="tabpanel"
										aria-labelledby="contact-tab"
									>
										product history here!
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
