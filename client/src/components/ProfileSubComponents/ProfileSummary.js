import React from "react";
import { connect } from "react-redux";
import {
	ProfileSoldItems,
	ProfileBookmarkedUsers,
	ProfileProductHistory,
	ProfileUnsoldItems,
	ProfileSettings
} from "../";
import { retrieveProducts } from "../../actions/product";
import { getAuthTokenFromStorage } from "../../helpers/utils";
import jwtDecode from 'jwt-decode';

class ProfileSummary extends React.Component {
    componentDidMount()
    {
        const token=getAuthTokenFromStorage();
        if(token)
        {
            const {_id}=jwtDecode(token);
            this.props.dispatch(retrieveProducts(_id));
        }
    }
	render() {
        const { user } = this.props.auth;
        const {allProducts}=this.props.product;
		return (
			<div className="col-sm-7 col-lg-8 mt-2 animate__animated animate__fadeInRight">
				<div className="profile-top">
					<div className="title-name mt-3">
						<h1>{user.name}</h1>
						<div className="hl two"></div>
					</div>
					<div className="name-subtitle">
						{user.trusted && (
							<h4>
								<i className="fas fa-check"></i> Trusted
							</h4>
						)}
					</div>
					<div className="bookmark">
						<button type="button" className="btn btn-light">
							<i className="fas fa-bookmark text-secondary"></i>{" "}
							Bookmark
						</button>{/* bookmarks button should be hidden and disabled if the user is viewing his own profile! */}
					</div>
					<div className="rankings">
						<p className="text-muted rating mb-0 mt-4">Rating</p>
						<div className="stars">
							<span>{user.upVotes} Upvotes</span>{" "}
							{user.upVotes > 10 && (
								<i className="fas fa-star"></i>
							)}
							{user.upVotes > 100 && (
								<i className="fas fa-star"></i>
							)}
							{user.upVotes > 1000 && (
								<i className="fas fa-star"></i>
							)}
							{user.upVotes > 10000 && (
								<i className="fas fa-star"></i>
							)}
							{user.upVotes > 100000 && (
								<i className="fas fa-star"></i>
							)}
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
						<li className="nav-item" role="presentation">
							<a
								className="nav-link bg-light"
								id="settings-tab"
								data-toggle="tab"
								href="#settings"
								role="tab"
								aria-controls="settings"
								aria-selected="false"
							>
								Settings
							</a>
						</li>
					</ul>
					<div className="tab-content" id="myTabContent">
						<div
							className="tab-pane fade active show"
							id="home"
							role="tabpanel"
							aria-labelledby="home-tab"
						>
							<ProfileSoldItems products={allProducts}/>
						</div>
						<div
							className="tab-pane fade"
							id="profile"
							role="tabpanel"
							aria-labelledby="profile-tab"
						>
							<ProfileUnsoldItems products={allProducts}/>
						</div>
						<div
							className="tab-pane fade"
							id="contact"
							role="tabpanel"
							aria-labelledby="contact-tab"
						>
							<ProfileProductHistory />
						</div>
						<div
							className="tab-pane fade"
							id="bookmarks"
							role="tabpanel"
							aria-labelledby="bookmarks-tab"
						>
							<ProfileBookmarkedUsers />
						</div>
						<div
							className="tab-pane fade"
							id="settings"
							role="tabpanel"
							aria-labelledby="settings-tab"
						>
							<ProfileSettings user={user}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps({ auth, product }) {
	return { auth, product };
}
export default connect(mapStateToProps)(ProfileSummary);
