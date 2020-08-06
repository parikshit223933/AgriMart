import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../actions/product";

class SingleProductInCategory extends React.Component {
	handleAddToCart = (productId) => {
		this.props.dispatch(addToCart(this.props.auth.user._id, productId));
	};
	render() {
		const { product, index } = this.props;
		return (
			<div
				className="card prod-card mb-2 mt-2 ml-1 mr-1"
				style={{
					width: "18rem"
				}}
				key={index}
			>
				<Link
					to={`/view-product/${product._id}/${this.props.auth.user._id}`}
					style={{
						width: 286,
						height: 286,
						backgroundImage: `url('http://localhost:8000/uploads/products/coverImage-${
							product.coverImage.split("-")[1]
						}')`,
						backgroundSize: "contain",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat"
					}}
				>
					{/* <img
                src={`http://localhost:8000/${product.coverImage}`}
                className="card-img-top"
                alt="CoverImg"
            /> */}
				</Link>
				<div className="card-body">
					<Link
						to={`/view-product/${product._id}/${this.props.auth.user._id}`}
					>
						<h5 className="card-title text-capitalize mb-0">
							{product.name}{" "}
						</h5>
					</Link>
					<small>({product.category})</small>
					<p className="card-text mb-1">
						<b>
							Rs.
							{product.price}
						</b>
					</p>
					<p className="card-text">Rating: {product.rating}</p>
					{this.props.auth.isLoggedIn ? (
						<button
							onClick={() => {
								this.handleAddToCart(product._id);
							}}
							className="btn btn-warning"
						>
							Add to Cart
						</button>
					) : (
						<Link to="/sign-in" className="btn btn-warning">
							Add to Cart
						</Link>
					)}
				</div>
			</div>
		);
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(SingleProductInCategory);
