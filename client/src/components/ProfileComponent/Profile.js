import React from "react";
import { connect } from "react-redux";
import { getAuthTokenFromStorage, showNotification } from "../../helpers/utils";
import * as jwtDecode from "jwt-decode";
import * as $ from "jquery";
import "../../Profile.css";
import { ProfileBrief, ProfileSummary } from "../";
import { Redirect } from "react-router-dom";
import { retrieveProducts, fetchBoughtProducts } from "../../actions/product";
import { clearAuthState } from "../../actions/auth";

class Profile extends React.Component
{
    componentDidMount()
    {
        this.handleAPICallsForProducts();
        this.profilePhotoHeightHandler();
    }
    handleAPICallsForProducts = () =>
    {
        const token = getAuthTokenFromStorage();
        if (token)
        {
            const user = jwtDecode(token);
            this.props.dispatch(retrieveProducts(user._id));
            this.props.dispatch(fetchBoughtProducts(user._id));
        }
    };
    profilePhotoHeightHandler = () =>
    {
        let img = $("user-profile-image>img");
        img.height(img.width());
    };
    componentDidUpdate(prevProps, prevState)//to show success messages after updating the profile
    {
        const {success, error}=this.props.auth;
        if(success)
        {
            showNotification(success, 1500, 'success');
            this.props.dispatch(clearAuthState());
        }
        if(error)
        {
            showNotification(error, 1500, 'error');
            this.props.dispatch(clearAuthState());
        }
    }
    render()
    {
        if (!localStorage.getItem("token"))
        {
            return <Redirect to="/sign-in" />;
        }
        if (this.props.product.inProgress||this.props.auth.inProgress)
        {
            return (
				<div
					style={{ height: "100vh", width: "100%" }}
					className="d-flex flex-column justify-content-center align-items-center ml-auto mr-auto"
				>
					<div
						className="spinner-border text-danger"
						role="status"
						style={{ width: "10rem", height: "10rem" }}
					>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
        }
        return (
            <div className="profile-component w-100">
                <div className="container profile-component-container bg-light pb-5">
                    <div className="row pl-2 pr-2">
                        <ProfileBrief />
                        <ProfileSummary />
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps({ product, auth })
{
    return {
        product,
        auth
    };
}
export default connect(mapStateToProps)(Profile);
