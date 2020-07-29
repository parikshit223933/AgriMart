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
		if (this.props.product.inProgress) {
			return <h1>Loading please wait...</h1>;
        }
        const {cart}=this.props.product;
        console.table(cart);
		return (
			<div className="container-fluid cart-component">
				<div className="row">
					<div className="col-md-4 pt-4">
                        <div className="price-details-wrapper ml-auto mr-auto d-flex flex-column justify-content-center w-100 align-items-center">
                            <div className="d-flex justify-content-between flex-row align-items-center">
                                <h4 className="text-capitalize">price details</h4>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between flex-row align-items-center">
                                <h6 className="m-0">price(1 item) :</h6> <b>Rs. 399</b>
                            </div>
                            <div className="d-flex justify-content-between flex-row align-items-center">
                                <h6 className="m-0">Delivery Fee:</h6> <b>Rs. 40</b>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between flex-row align-items-center">
                                <h6 className="m-0">total amount</h6> <b>Rs. 439</b>
                            </div>
                        </div>
                    </div>
					<div className="col-md-8 pt-4">
                        
                    </div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ auth, product }) {
	return { auth, product };
}
export default connect(mapStateToProps)(Cart);
