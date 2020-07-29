import React from "react";
import "../cart.css";
import { connect } from "react-redux";
import { getCartItems } from "../actions/product";
import { getAuthTokenFromStorage } from "../helpers/utils";
import jwtDecode from "jwt-decode";

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
		const { cart } = this.props.product;
		console.table(cart);
		return (
			<div className="container-fluid cart-component">
				<div className="row">
					<div className="col-md-4 pt-4">
						<div className="price-details-wrapper ml-auto mr-auto d-flex flex-column justify-content-center w-100 align-items-center">
							<div className="d-flex justify-content-between flex-row align-items-center">
								<h4 className="text-capitalize">
									price details
								</h4>
							</div>
							<hr />
							<div className="d-flex justify-content-between flex-row align-items-center">
								<h6 className="m-0">price(1 item) :</h6>{" "}
								<b>
									<i className="fas fa-rupee-sign"></i> 399
								</b>
							</div>
							<div className="d-flex justify-content-between flex-row align-items-center">
								<h6 className="m-0">Delivery Fee:</h6>{" "}
								<b>
									<i className="fas fa-rupee-sign"></i> 40
								</b>
							</div>
							<hr />
							<div className="d-flex justify-content-between flex-row align-items-center">
								<h6 className="m-0">total amount</h6>{" "}
								<b>
									<i className="fas fa-rupee-sign"></i> 439
								</b>
							</div>
						</div>
					</div>
					<div className="col-md-8 pt-4">
						<div className="cart-wrapper">
							<header className="pl-4 d-flex flex-row justify-content-start align-items-center">
								<h3>My Cart(1)</h3>
							</header>
							<hr />
							<main className="d-flex flex-column justify-content-center align-items-center w-100">
								<div className="d-flex w-100 mt-1 mb-1 flex-row justify-content-start align-items-start p-3 single-cart-item">
									<div className="w-25 d-flex flex-column justify-content-center align-items-center cart-prod-img">
										<div
											style={{
												width: 100,
												height: 100,
												backgroundImage:
													'url("https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")',
												backgroundSize: "cover",
												backgroundPosition: "center"
											}}
										></div>
										<div className="d-flex flex-row controller align-items-center justify-content-between w-75 mt-4">
											<button
												type="button"
												className="btn decrease btn-primary"
											>
												-
											</button>
											99
											<button
												type="button"
												className="btn increase btn-primary"
											>
												+
											</button>
										</div>
									</div>
									<div className="d-flex align-items-start justify-content-between flex-column cart-single-product-details">
										<div>
											<h5 className="m-0">
												NAME of the product
											</h5>
										</div>
										<div>
											<p className="text-secondary m-0">
												(category)
											</p>
										</div>
										<div>price</div>
										<div>
											<button
												type="button"
												className="btn btn-danger remove-item-from-cart"
											>
												REMOVE
											</button>
										</div>
									</div>
								</div>
							</main>
							<hr />
							<footer className="pl-4 d-flex flex-row justify-content-end align-items-center pr-4">
								<button
									type="button"
									className="btn place-order btn-danger"
								>
									Place Order
								</button>
							</footer>
						</div>
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
