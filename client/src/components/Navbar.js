import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";

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
	render() {
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
						<div className="profile">
							<i className="fas fa-user-alt"></i>
						</div>
						<div className="signin-button">
							<i className="fas fa-sign-in-alt"></i>
						</div>
						<div className="signup-button">
							<i className="fas fa-user-plus"></i>
						</div>
						<div className="log-out">
							<i className="fas fa-sign-out-alt"></i>
						</div>
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
						<Link to="/profile" className="profile-exposed">
							<div>Profile</div>
						</Link>
						<Link to="/sign-in" className="signin-button-exposed">
							<div>Sign In</div>
						</Link>
						<Link to="/sign-up" className="signup-button-exposed">
							<div>Sign Up</div>
						</Link>
						<Link to="/log-out" className="log-out-exposed">
							<div>Log Out</div>
						</Link>
						<Link to="/cart" className="cart-exposed">
							<div>Cart</div>
						</Link>
						<Link to="/categories" className="categories-exposed">
							<div>Categories</div>
						</Link>
						<Link to="" className="toggle-theme-exposed">
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

export default Navbar;
