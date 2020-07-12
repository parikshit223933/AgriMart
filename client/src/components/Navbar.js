import React from "react";

class Navbar extends React.Component {
	render() {
		return (
			<div className="custom-navbar">
				<div className="website-logo">
					<i class="fas fa-seedling"></i>
				</div>
				<div className="buttons-container">
					<div className="home">
						<i class="fas fa-home"></i>
					</div>
					<div className="user">
						<i class="fas fa-user-alt"></i>
					</div>
					<div className="cart">
						<i class="fas fa-shopping-cart"></i>
					</div>
                    <div className="categories">
                    <i class="fas fa-sitemap"></i>
                    </div>
					<div className="theme-change">
						<i class="fas fa-exchange-alt"></i>
					</div>
					<div className="aboit-us">
						<i class="fas fa-info-circle"></i>
					</div>
				</div>
			</div>
		);
	}
}

export default Navbar;
