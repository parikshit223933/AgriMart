import React from "react";
import "../cart.css";
import { connect } from "react-redux";
import { getCartItems, decreaseProductQuantity } from "../actions/product";
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
	getTotalNumberOfItems = (cart) => {
		let n = 0;
		cart.forEach((item) => {
			n += item.quantity;
		});
		return n;
	};
	getTotalCartPrice = (cart) => {
		let price = 0;
		cart.forEach((item) => {
			price += item.quantity * item.product.price;
		});
		return price;
    };
    handleReduceQuantity=(productId)=>
    {
        this.props.dispatch(decreaseProductQuantity(this.props.auth.user._id, productId));
    }
	render() {
		if (this.props.product.inProgress) {
			return <h1>Loading please wait...</h1>;
		}
		const { cart } = this.props.product;
		console.log(cart);
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
								<h6 className="m-0">
									Price ({this.getTotalNumberOfItems(cart)}{" "}
									items) :
								</h6>{" "}
								<b>
									<i className="fas fa-rupee-sign"></i>{" "}
									{this.getTotalCartPrice(cart)}
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
								<h6 className="m-0">Total Amount</h6>{" "}
								<b>
									<i className="fas fa-rupee-sign"></i>{" "}
									{this.getTotalCartPrice(cart) + 40}
								</b>
							</div>
						</div>
					</div>
					<div className="col-md-8 pt-4">
						<div className="cart-wrapper">
							<header className="pl-4 d-flex flex-row justify-content-start align-items-center">
								<h3>My Cart({cart.length})</h3>
							</header>
							<hr />
							<main className="d-flex flex-column justify-content-center align-items-center w-100">
								{cart.map((item) => {
									return (
										<div className="d-flex w-100 mt-1 mb-1 flex-row justify-content-start align-items-start p-3 single-cart-item" key={item._id}>
											<div className="w-25 d-flex flex-column justify-content-center align-items-center cart-prod-img">
												<div
													style={{
														width: 100,
														height: 100,
														backgroundImage:
															'url("https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")',
														backgroundSize: "cover",
														backgroundPosition:
															"center"
													}}
												></div>
												<div className="d-flex flex-row controller align-items-center justify-content-between w-75 mt-4">
													<button
														type="button"
                                                        className="btn decrease btn-primary"
                                                        onClick={()=>{this.handleReduceQuantity(item.product._id)}}
													>
														-
													</button>
													{item.quantity}
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
													<h5 className="m-0 text-capitalize">
														{item.product.name}
													</h5>
												</div>
												<div>
													<p className="text-secondary m-0">
														({item.product.category})
													</p>
												</div>
												<div><b><i className="fas fa-rupee-sign"></i> {item.product.price}</b></div>
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
									);
								})}
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
