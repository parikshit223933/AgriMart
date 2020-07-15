import React from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import "../Profile.css";
import {ProfileBrief} from './';
import {ProfileSummary} from './';

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
						<ProfileBrief/>
						<ProfileSummary/>
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
