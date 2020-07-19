import React from "react";
import { API_URLS } from "../../helpers/urls";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../actions/product";
import { connect } from "react-redux";

class SingleProduct extends React.Component {
	componentDidMount() {
		this.handleproductImages();
	}
	componentDidUpdate(prevProps, prevState) {
		this.handleproductImages();
	}
	handleDeleteProduct = (productId) => {
        console.log(productId)
		this.props.dispatch(deleteProduct(productId, this.props.auth.user._id));
	};
	handleproductImages = () => {
		if (this.props.product) {
			const { product } = this.props;
			let firstPart =
				API_URLS.profilePictureRoot() + "/uploads/products/coverImage-";
			let secondPart = product.coverImage.split("-")[
				product.coverImage.split("-").length - 1
			];
			let newURI = firstPart + secondPart;
			$(`.${this.props.productId}`).css(
				"background-image",
				"url('" + newURI + "')"
			);
			$(`.${this.props.productId}`).css("background-position", "center");
			$(`.${this.props.productId}`).css("background-repeat", "no-repeat");
			$(`.${this.props.productId}`).css("background-size", "cover");
		}
	};

	render() {
		//if editAllowed is true then i can allow the user to edit the product!
		if (this.props.editAllowed) {
			const { product } = this.props;
			return (
				<div className="single-product mt-2 mb-2 flex-row d-flex p-2 editable-single-product">
					<div
						className={`image-container-left-section ${this.props.productId}`}
					></div>
					<div className="details-container p-1 d-flex flex-column justify-content-lg-start align-items-start">
						<div>
							{product.name} ({product.category})
						</div>
						<hr />
						<div>
							<b>Rs.</b> {product.price}
						</div>
						<hr />
						{this.props.showRemaining && (
							<div>
								<b>Remaining:</b> {product.remainingQuantity}{" "}
								Standard Units
							</div>
						)}
						{this.props.showBuyers && (
							<div>
								<b>Buyers:</b> {product.Buyers.length}
							</div>
						)}
					</div>
					{/* this is the cover on each product which contains 3 actions, i.e. to delete, edit or view the product. */}
					<div className="editable-cover">
						<Link
							to={`/edit-product/${product._id}/${product.seller}`}
							className="EDIT"
						>
							<button
								type="button"
								className="btn btn-warning"
								data-toggle="modal"
								data-target="#editModal"
							>
								Edit
							</button>
						</Link>
						<div>
							<button
								type="button"
								className="btn btn-danger"
								data-toggle="modal"
                                data-target={`#a${product._id}`}/* it didnt work when the id started from a number so i started it with a alphabet */
                                id={product._id}
							>
								Delete
							</button>
						</div>
						<Link to={`/view-product/${product._id}/${this.props.auth.user._id}`}>
							<button type="button" className="btn btn-primary">
								View
							</button>
						</Link>
					</div>
					<div
						className="modal fade"
						id={`a${product._id}`}
						tabIndex="-1"
						role="dialog"
						aria-labelledby="deleteProductLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h5
										className="modal-title"
										id="deleteProductLabel"
									>
										Delete {product.name}?
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									Are you sure you want to delete{" "}
									{product.name}? <br /> This process can't be
									undone!
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										data-dismiss="modal"
									>
										Cancel
									</button>
									<button
										type="button"
										className="btn btn-danger"
                                        data-dismiss="modal"
                                        id={product._id}
										onClick={() => {
											this.handleDeleteProduct(
												product._id
											);
										}}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		//if the edit allowed is false then proceed with the normal rendering
		const { product } = this.props;
		return (
			<div className="single-product mt-2 mb-2 flex-row d-flex p-2">
				<div
					className={`image-container-left-section ${this.props.productId}`}
				></div>
				<div className="details-container p-1 d-flex flex-column justify-content-lg-start align-items-start">
					<div>
						{product.name} ({product.category})
					</div>
					<hr />
					<div>
						<b>Rs.</b> {product.price}
					</div>
					<hr />
					{this.props.showRemaining && (
						<div>
							<b>Remaining:</b> {product.remainingQuantity}{" "}
							Standard Units
						</div>
					)}
					{this.props.showBuyers && (
						<div>
							<b>Buyers:</b> {product.Buyers.length}
						</div>
					)}
				</div>
			</div>
		);
	}
}
function mapStateToProps({ auth }) {
	return {
		auth
	};
}
export default connect(mapStateToProps)(SingleProduct);
