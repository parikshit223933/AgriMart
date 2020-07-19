import React from "react";
import { retrieveProducts, editProduct } from "../actions/product";
import * as $ from "jquery";
import { connect } from "react-redux";
import { getAuthTokenFromStorage } from "../helpers/utils";
import jwtDecode from "jwt-decode";

class EditProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.firstRefresh = false;
	}
	componentDidMount() {
		this.handleAPICallsForProducts();
    }
    
	formInputHandler = (property, event) => {
		if (property === "coverImage") {
			this.setState({
				coverImage: event.target.files[0]
			});
		} else {
			this.setState({
				[property]: event.target.value
			});
		}
    };
    
	handleSubmit = (event) => {
		event.preventDefault();
		const { productId, userId } = this.props.match.params;

		const data = new FormData();

		data.append("userId", userId);
		data.append("productId", productId);

		for (let key in this.state) {
			data.append(key, this.state[key]);
        }
        
        this.props.dispatch(editProduct(data))
    };
    
	handleAPICallsForProducts = () => {
		const token = getAuthTokenFromStorage();
		if (token) {
			const user = jwtDecode(token);
			this.props.dispatch(retrieveProducts(user._id));
		}
    };
    
	componentDidUpdate(prevProps, prevState) {
		const { productId } = this.props.match.params;
		if (!this.firstRefresh) {
			this.props.product.allProducts.forEach((product) => {
				if (product._id === productId) {
					$("#name").val(product.name);
					$("#price").val(product.price);
					$("#description").val(product.description);
					$("#category").val(product.category);
					$("#total-quantity").val(product.remainingQuantity);
					$("#minimum-order-quantity").val(
						product.minimumOrderQuantity
					);
					this.firstRefresh = true;
				}
			});
		}
	}
	render() {
		console.log(this.state);
		return (
			<div className="sell-component">
				<div className="container-fluid bg-warning">
					<div className="row">
						<div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3 bg-light my-5 p-5">
							<h1 className="text-center pb-4">EDIT PRODUCT</h1>
							<form>
								<div className="form-group animate__animated animate__fadeInDown">
									<label htmlFor="name">Entity Name</label>
									<input
										type="text"
										className="form-control"
										id="name"
										aria-describedby="name"
										placeholder="Enter Entity name here"
										required
										onChange={(event) => {
											this.formInputHandler(
												"name",
												event
											);
										}}
									/>
								</div>
								<div className="form-group animate__animated animate__fadeInLeft">
									<label htmlFor="price">Price</label>
									<div className="input-group mb-2">
										<div className="input-group-prepend">
											<div className="input-group-text">
												INR/STD. UNIT
											</div>
										</div>
										<input
											type="number"
											className="form-control"
											id="price"
											placeholder="Price of the entity"
											required
											onChange={(event) => {
												this.formInputHandler(
													"price",
													event
												);
											}}
										/>
									</div>
									{/* <label htmlFor="price">Price</label>
									<input
										type="number"
										className="form-control"
										id="price"
										aria-describedby="price"
										placeholder="Price of the entity"
										required
										onChange={(event) => {
											this.formInputHandler(
												"price",
												event
											);
										}}
										value={this.state.price}
									/> */}
								</div>
								<div className="form-group animate__animated animate__fadeInRight">
									<label htmlFor="cover-image">
										Cover Image
									</label>
									<input
										type="file"
										className="form-control-file"
										id="cover-image"
										required
										onChange={(event) => {
											this.formInputHandler(
												"coverImage",
												event
											);
										}}
									/>
								</div>
								{/* <div className="form-group">
									<label htmlFor="image">Image Url</label>
									<input
										type="text"
										className="form-control"
										id="image"
										aria-describedby="image"
										placeholder="URL of the image"
										required
										onChange={(event) => {
											this.formInputHandler(
												"coverImage",
												event
											);
										}}
										value={this.state.coverImage}
									/>
								</div> */}
								<div className="form-group animate__animated animate__fadeInUp">
									<label htmlFor="description">
										Description
									</label>
									<input
										type="text"
										className="form-control"
										id="description"
										aria-describedby="description"
										placeholder="Describe this entity"
										required
										onChange={(event) => {
											this.formInputHandler(
												"description",
												event
											);
										}}
									/>
								</div>
								<div className="form-group animate__animated animate__fadeInTopLeft">
									<select
										className="custom-select"
										id="category"
										defaultValue="1"
										onChange={(event) => {
											this.formInputHandler(
												"category",
												event
											);
										}}
									>
										<option value="Category">
											Category
										</option>
										<option value="Cereals and Pulses">
											Cereals and Pulses
										</option>
										<option value="Seeds">Seeds</option>
										<option value="Spices">Spices</option>
										<option value="Fruits">Fruits</option>
										<option value="Vegetables">
											Vegetables
										</option>
										<option value="Dry Fruits">
											Dry Fruits
										</option>
										<option value="Edible Oils">
											Edible Oils
										</option>
										<option value="Dairy Products">
											Dairy Products
										</option>
										<option value="Other">Other</option>
									</select>
									{/* <label htmlFor="category">Category</label>
									<input
										type="text"
										className="form-control"
										id="category"
										aria-describedby="category"
										placeholder="Category of entity"
										required
										onChange={(event) => {
											this.formInputHandler(
												"category",
												event
											);
										}}
										value={this.state.category}
									/> */}
								</div>
								<div className="form-group animate__animated animate__fadeInTopRight">
									<label htmlFor="total-quantity">
										Total Quantity
									</label>
									<div className="input-group mb-2">
										<div className="input-group-prepend">
											<div className="input-group-text">
												Grams or Units
											</div>
										</div>
										<input
											type="number"
											className="form-control"
											id="total-quantity"
											placeholder="Initial Total Amount of the entity"
											required
											onChange={(event) => {
												this.formInputHandler(
													"remainingQuantity",
													event
												);
											}}
										/>
									</div>
									{/* <label htmlFor="total-quantity">
										Total Quantity
									</label>
									<input
										type="number"
										className="form-control"
										id="total-quantity"
										aria-describedby="total-quantity"
										placeholder="Initial Total Amount of the entity"
										required
										onChange={(event) => {
											this.formInputHandler(
												"remainingQuantity",
												event
											);
										}}
										value={this.state.remainingQuantity}
									/> */}
								</div>
								<div className="form-group animate__animated animate__fadeInBottomLeft">
									<label htmlFor="minimum-order-quantity">
										Minimum Order Quantity
									</label>
									<div className="input-group mb-2">
										<div className="input-group-prepend">
											<div className="input-group-text">
												Grams or Units
											</div>
										</div>
										<input
											type="number"
											className="form-control"
											id="minimum-order-quantity"
											placeholder="Minimum cost of the entity"
											required
											onChange={(event) => {
												this.formInputHandler(
													"minimumOrderQuantity",
													event
												);
											}}
										/>
									</div>
									{/* <label htmlFor="min-qty">
										Minimum Order Quantity
									</label>
									<input
										type="number"
										className="form-control"
										id="min-qty"
										aria-describedby="min-qty"
										placeholder="Minimum cost of the entity"
										required
										onChange={(event) => {
											this.formInputHandler(
												"minimumOrderQuantity",
												event
											);
										}}
										value={this.state.minimumOrderQuantity}
									/> */}
								</div>
								<button
									type="submit"
									className="btn btn-success animate__animated animate__fadeInBottomRight"
									onClick={this.handleSubmit}
								>
									Submit
								</button>
							</form>
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

export default connect(mapStateToProps)(EditProduct);
