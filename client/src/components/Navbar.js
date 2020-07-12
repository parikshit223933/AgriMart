import React from "react";
import * as $ from "jquery";

class Navbar extends React.Component {
	componentDidMount() {
		this.addHoverToNavbar();
	}
	addHoverToNavbar = () => {
		$(".custom-navbar").mouseenter(function () {
			$(".exposed-navbar").addClass("exposed");
		});
		$(".custom-navbar").mouseleave(function () {
			$(".exposed-navbar").removeClass("exposed");
		});

		$(".exposed-navbar").mouseenter(function () {
			$(".exposed-navbar").addClass("exposed");
		});
		$(".exposed-navbar").mouseleave(function () {
			$(".exposed-navbar").removeClass("exposed");
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
						<div className="cart">
							<i className="fas fa-shopping-cart"></i>
						</div>
						<div className="categories">
							<i className="fas fa-sitemap"></i>
						</div>
						<div className="toggle-theme">
							<i className="fas fa-exchange-alt"></i>
						</div>
						<div className="more-info">
							<i className="fas fa-info-circle"></i>
						</div>
					</div>
				</div>
				<div className="exposed-navbar">
					<div className="website-name">Agrimart</div>
					<div className="buttons-container-exposed">
						<div className="home-exposed">
							<div>Home</div>
						</div>
						<div className="profile-exposed">
							<div>Profile</div>
						</div>
						<div className="cart-exposed">
							<div>Cart</div>
						</div>
						<div className="categories-exposed">
							<div>Categories</div>
						</div>
						<div className="toggle-theme-exposed">
							<div>Toggle Theme</div>
						</div>
						<div className="more-info-exposed">
							<div>More Info</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Navbar;
