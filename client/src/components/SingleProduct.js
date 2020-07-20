import React from "react";
import { connect } from "react-redux";
import "../singleProduct.css";
import { getSingleProduct } from "../actions/product";
import { API_URLS } from "../helpers/urls";
import dateFormat from "dateformat";
import { Review, ReviewHeader, ReviewCreator } from "./";
import { createReview } from "../actions/product";

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.dispatch(
			getSingleProduct(this.props.match.params.productId)
		);
    }

    handleSubmitInReviewCreator = (event, reviewDetails) => {
        event.preventDefault();
        //finally in the state i will have author, product, reviewText, reviewTitle, rating
        this.props.dispatch(createReview(reviewDetails));
    };
    
	render() {
		const { singleProduct: product } = this.props.product;
        console.log(product);
		if (!product) {
			return (
				<div style={{height:'100vh', width:'100vh'}} className="d-flex flex-column justify-content-center align-items-center ml-auto mr-auto">
				    <div
    					className="spinner-border text-danger"
                        role="status"
                        style={{width:'10rem', height:'10rem'}}
    				>
    					<span className="sr-only">Loading...</span>
    				</div>
				</div>
			);
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
								<h3>
									{product.name} ({product.category})
								</h3>
							</div>
							<div className="mb-3">
								Posted on:{" "}
								{dateFormat(
									product.createdAt,
									"dddd, mmmm dS, yyyy"
								)}
							</div>
							<div className="rating-review-batches">
								<span className="badge badge-success">
									{product.rating}{" "}
									<i className="fas fa-star"></i>
								</span>
								<span>
									{" "}
									{product.one +
										product.two +
										product.three +
										product.four +
										product.five}{" "}
									ratings
								</span>
								<span> & </span>
								<span> {product.reviews.length} reviews</span>
							</div>
							<div className="product-cost mt-3">
								<h3>
									<i
										className="fas fa-rupee-sign"
										style={{ fontSize: "25px" }}
									></i>{" "}
									{product.price}{" "}
									<small>per unit of product</small>
								</h3>
							</div>
							<div className="minimumOrderQty">
								<p>
									<b>Minimum Order Quantity: </b>{" "}
									{product.minimumOrderQuantity} Units
								</p>
							</div>
							<div className="product-description mt-3">
								<h5>Description:</h5>
								<p>{product.description}</p>
							</div>
							<div>
								<h5>Seller:</h5>

								<div
									className="card mb-3"
									style={{ maxWidth: "540px" }}
								>
									<div className="row no-gutters">
										<div className="col-md-8">
											<div className="card-body">
												<div>
													<h6 className="m-0">
														{product.seller.name}
													</h6>
												</div>
												<div>
													<i>
														{
															product.seller
																.profession
														}
													</i>
												</div>
												{product.seller.trusted && (
													<div>
														<b>
															{
																product.seller
																	.trusted
															}
														</b>
													</div>
												)}
												<div>
													{product.seller.upvotes}
												</div>
												<div>
													<p className="m-0">
														Seller Since
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="ratings-and-reviews">
								<h5>Ratings & Reviews</h5>
								<div className="review-main">
									<ReviewHeader product={product} />
                                    <ReviewCreator {...this.props} handleSubmitInReviewCreator={this.handleSubmitInReviewCreator}/>
                                    {product.reviews.map((review, index)=>
                                    {
                                        return <Review review={review} key={index}/>
                                    })}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps({ product, auth }) {
	return { product, auth };
}
export default connect(mapStateToProps)(SingleProduct);
