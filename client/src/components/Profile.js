import React from "react";
import { connect } from "react-redux";
import { getAuthTokenFromStorage } from "../helpers/utils";
import * as jwtDecode from "jwt-decode";
import * as $ from "jquery";
import "../Profile.css";
import {ProfileBrief} from './';
import {ProfileSummary} from './';
import { Redirect } from "react-router-dom";
import { retrieveProducts, fetchBoughtProducts } from "../actions/product";

class Profile extends React.Component {
	componentDidMount() {
        this.handleAPICallsForProducts()
        this.profilePhotoHeightHandler();
        this.handleAnimation()
    }
    handleAPICallsForProducts=()=>
    {
        const token = getAuthTokenFromStorage();
		if (token) {
			const user = jwtDecode(token);
			this.props.dispatch(retrieveProducts(user._id));
			this.props.dispatch(fetchBoughtProducts(user._id));
		}
    }
	profilePhotoHeightHandler = () => {
		let img = $("user-profile-image>img");
		img.height(img.width());
    };
    handleAnimation=()=>
    {
        $('.custom_animator').addClass('animate__animated animate__flipInY');
        setTimeout(function()
        {
            $('.custom_animator').removeClass('animate__animated animate__flipInY');
        }, 1000);
    }
	render() {
        if(!localStorage.getItem('token'))
        {
            return <Redirect to="/sign-in"/>
        }
		return (
			<div className="profile-component bg-warning">
				<div className="container bg-light pb-5 custom_animator">
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
