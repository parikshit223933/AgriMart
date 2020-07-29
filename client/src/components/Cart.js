import React from "react";
import "../cart.css";
import { connect } from "react-redux";
import { getCartItems } from "../actions/product";
import { getAuthTokenFromStorage } from "../helpers/utils";
import jwtDecode from 'jwt-decode';

class Cart extends React.Component {
	componentDidMount() {
        const token = getAuthTokenFromStorage();
		if (token) {
			const user = jwtDecode(token);
			this.props.dispatch(getCartItems(user._id));
		}
	}
	render() {
		if (!this.props.product.cart) {
			return <h1>Loading please wait...</h1>;
		}
		return (
			<div className="container-fluid cart-component">
				<div className="row">
					<div className="col-md-4"></div>
					<div className="col-md-8"></div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ auth, product }) {
	return { auth, product };
}
export default connect(mapStateToProps)(Cart);
