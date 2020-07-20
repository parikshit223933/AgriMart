import React from "react";
import { connect } from "react-redux";
import "../singleProduct.css";
import { getSingleProduct } from "../actions/product";
import { API_URLS } from "../helpers/urls";
class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.dispatch(
			getSingleProduct(this.props.match.params.productId)
		);
	}
	render() {
		const { singleProduct: product } = this.props.product;
		if (!product) {
			return <h1>Loading...</h1>;
		}

		return (
			<div className="single-product-component">
				<div className="container-fluid bg-white">
					<div className="row">
						<div className="col-sm-5 pb-5 pt-3">
							<div className="left-wrapper sticky-top">
								<div className="product-image">
									<img
										src={`${API_URLS.profilePictureRoot()}/${
											this.props.product.singleProduct
												.coverImage
										}`}
										alt="single"
									/>
								</div>
								<div className="product-action-buttons pt-4 d-flex flex-row justify-content-around align-items-center flex-wrap">
									<div className="add-to-cart-button m-1">
										<button
											type="button"
											className="btn btn-warning btn-lg text-white"
										>
											<i className="fas fa-cart-arrow-down"></i>{" "}
											Add to Cart
										</button>
									</div>
									<div className="buy-now-button m-1">
										<button
											type="button"
											className="btn btn-success btn-lg"
										>
											<i className="fas fa-rupee-sign"></i>{" "}
											Buy Now
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-7 pb-5 pt-4">
							<div className="product-name text-capitalize">
								<h3>{product.name} ({product.category})</h3>
							</div>
							<div className="rating-review-batches">
								<span className="badge badge-success">
									{product.rating} <i className="fas fa-star"></i>
								</span>
								<span> {product.one+product.two+product.three+product.four+product.five} ratings</span>
                                <span> & </span>
								<span> {product.reviews.length} reviews</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps({ product }) {
	return { product };
}
export default connect(mapStateToProps)(SingleProduct);
