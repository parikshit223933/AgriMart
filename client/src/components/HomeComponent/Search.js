import React from "react";
import { connect } from "react-redux";
import { API_URLS } from "../../helpers/urls";
import { getFormBody } from "../../helpers/utils";
import { Link } from "react-router-dom";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchtext: "",
			products: []
		};
	}
	handleSearch = (event) => {
		/* WARNING: THE STORE SHOULD NOT BE UPDATED, BECAUSE IT WILL TRIGGER A RE-RENDER OF ALL THE COMPONENTS USING THE STORE AND HENCE THE WHOLE HOME PAGE WILL BE REFRESHED, WHICH WILL MAKE IT DIFFICULT FOR THE USER TO PROVIDE CONTINiOUS INPUT IN THE SEARCH BAR */
		event.preventDefault();
		this.setState(
			{
				searchtext: event.target.value
			},
			() => {
				if (!this.state.searchtext) {
					this.setState({
						products: []
					});
					return;
				}
				let url = API_URLS.searchProducts();
				let searchStr = this.state.searchtext;
				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: getFormBody({ searchStr })
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.success) {
							this.setState({
								products: data.data.products
							});
						} return;
					});
			}
		);
	};
	render() {
		return (
			<div className="search-bar-container ml-2 mr-2">
				<input
					className="form-control mr-sm-2"
					type="search"
					placeholder="Search Products"
					aria-label="Search"
					onChange={this.handleSearch}
					value={this.state.searchtext}
				/>
                <div className="search-ico"><i className="fas fa-search"></i></div>
				{this.state.products.length ? (
					<div className="search-results">
						{this.state.products.map((product) => {
							return this.props.auth.isLoggedIn ? (
								<Link
									to={`/view-product/${product._id}/${this.props.auth.user._id}`}
								>
									<div key={product._id}>{product.name}</div>
									<hr />
								</Link>
							) : (
								<Link to="/sign-in">
									<div key={product._id}>{product.name}</div>
									<hr />
								</Link>
							);
						})}
					</div>
				) : null}
			</div>
		);
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(Search);
