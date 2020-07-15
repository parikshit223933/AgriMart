import React from "react";
import {ProfileSoldItems, ProfileBookmarkedUsers, ProfileProductHistory, ProfileUnsoldItems} from '../';

class ProfileSummary extends React.Component {
	render() {
		return (
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
						<button type="button" className="btn btn-light">
							<i className="fas fa-bookmark text-secondary"></i>{" "}
							Bookmark
						</button>
					</div>
					<div className="rankings">
						<p className="text-muted rating mb-0 mt-4">Rating</p>
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
					<ul className="nav nav-tabs" id="myTab" role="tablist">
						<li className="nav-item" role="presentation">
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
						<li className="nav-item" role="presentation">
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
						<li className="nav-item" role="presentation">
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
						<li className="nav-item" role="presentation">
							<a
								className="nav-link bg-light"
								id="bookmarks-tab"
								data-toggle="tab"
								href="#bookmarks"
								role="tab"
								aria-controls="bookmarks"
								aria-selected="false"
							>
								Bookmarks
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
							<ProfileSoldItems/>
						</div>
						<div
							className="tab-pane fade"
							id="profile"
							role="tabpanel"
							aria-labelledby="profile-tab"
						>
							<ProfileUnsoldItems/>
						</div>
						<div
							className="tab-pane fade"
							id="contact"
							role="tabpanel"
							aria-labelledby="contact-tab"
						>
							<ProfileProductHistory/>
						</div>
						<div
							className="tab-pane fade"
							id="bookmarks"
							role="tabpanel"
							aria-labelledby="bookmarks-tab"
						>
							<ProfileBookmarkedUsers/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ProfileSummary;