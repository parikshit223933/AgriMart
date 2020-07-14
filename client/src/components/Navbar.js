import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

class Navbar extends React.Component {
	componentDidMount() {
		this.addHoverToNavbar();
	}
	addHoverToNavbar = () => {
		/* for custom navbar */
		$(".custom-navbar").mouseenter(function () {
			$(".exposed-navbar").addClass("exposed");
			$(".website-name").addClass("animate__jello");
		});
		$(".custom-navbar").mouseleave(function () {
			$(".exposed-navbar").removeClass("exposed");
			$(".website-name").removeClass("animate__jello");
		});
		/* for exposed navbar */
		$(".exposed-navbar").mouseenter(function () {
			$(".exposed-navbar").addClass("exposed");
			$(".website-name").addClass("animate__jello");
		});
		$(".exposed-navbar").mouseleave(function () {
			$(".exposed-navbar").removeClass("exposed");
			$(".website-name").removeClass("animate__jello");
		});
    };
    logouthandler=(event)=>
    {
        this.props.dispatch(logout());
    }
    handleThemeToggler=(event)=>
    {
        event.preventDefault();
        $('.custom-navbar').toggleClass('theme-light-background');
        $('.buttons-container').toggleClass('theme-light-background');
        $('.exposed-navbar').toggleClass('theme-light-background');
        $('.buttons-container-exposed').toggleClass('theme-light-background')
        $('.buttons-container-exposed>a').toggleClass('theme-light-background')
    }
	render() {
		const { isLoggedIn } = this.props.auth;
		return (
			<React.Fragment>
				<div className="custom-navbar">
					<div className="website-logo">
						<i className="fas fa-seedling"></i>
					</div>
					<div className="buttons-container">
						<div className="home">
							<i className="fas fa-home"></i>
						</div>
						{isLoggedIn && (
							<div className="profile">
								<i className="fas fa-user-alt"></i>
							</div>
						)}
						{!isLoggedIn && (
							<div className="signin-button">
								<i className="fas fa-sign-in-alt"></i>
							</div>
						)}
						{!isLoggedIn && (
							<div className="signup-button">
								<i className="fas fa-user-plus"></i>
							</div>
						)}
						{isLoggedIn && (
							<div className="log-out">
								<i className="fas fa-sign-out-alt"></i>
							</div>
						)}
						<div className="cart">
							<i className="fas fa-shopping-cart"></i>
						</div>
						<div className="categories">
							<i className="fas fa-sitemap"></i>
						</div>
						<div className="toggle-theme">
							<i className="fas fa-exchange-alt"></i>
						</div>
						<div className="sell">
							<i className="fas fa-rupee-sign"></i>
						</div>
						<div className="more-info">
							<i className="fas fa-info-circle"></i>
						</div>
					</div>
				</div>
				<div className="exposed-navbar">
					<div className="website-name animate__animated">
						Agrimart
					</div>
					<div className="buttons-container-exposed">
						<Link to="/" className="home-exposed">
							<div>Home</div>
						</Link>
                        {isLoggedIn&&<Link to="/profile" className="profile-exposed">
							<div>Profile</div>
						</Link>}
                        {!isLoggedIn&&<Link to="/sign-in" className="signin-button-exposed">
							<div>Sign In</div>
						</Link>}
						{!isLoggedIn&&<Link to="/sign-up" className="signup-button-exposed">
							<div>Sign Up</div>
						</Link>}
						{isLoggedIn&&<Link to="/sign-in" onClick={this.logouthandler} className="log-out-exposed">
							<div>Log Out</div>
						</Link>}
						<Link to="/cart" className="cart-exposed">
							<div>Cart</div>
						</Link>
						<Link to="/categories" className="categories-exposed">
							<div>Categories</div>
						</Link>
						<Link to="" className="toggle-theme-exposed" onClick={this.handleThemeToggler}>
							<div>Toggle Theme</div>
						</Link>
						<Link to="/sell" className="sell-exposed">
							Sell on Agrimart
						</Link>
						<Link to="/more-info" className="more-info-exposed">
							<div>More Info</div>
						</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(Navbar);
