import React from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { deleteReview, updateReview } from "../actions/product";

/* this component contains all the reviews */
class Review extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	inputChangeHandler = (key, event) => {
		this.setState({
			[key]: event.target.value
		});
	};
	handleSubmit = (event) => {
		//send the state, userId, productId and reviewId
		event.preventDefault();
		this.props.dispatch(updateReview(
			this.state,
			this.props.auth.user._id,
			this.props.review._id,
			this.props.review.product
		));
	};
	handleDelete = () => {
		console.log(this.props.review.product, this.props.review._id);
		this.props.dispatch(
			deleteReview(
				this.props.review.product,
				this.props.review._id,
				this.props.auth.user._id
			)
		);
	};
	render() {
		console.log(this.state);
		if (!this.props.review) {
			return <div>Loading...</div>;
		} else {
			const { review } = this.props;
			return (
				<div className="apply-shadow d-flex flex-column justify-content-around align-items-start p-3 position-relative">
					<div className="d-flex flex-row justify-content-start align-items-center w-75">
						<div className="mr-3">
							{review.rating >= 4 && (
								<span className="badge badge-success text-white">
									{review.rating}{" "}
									<i className="fas fa-star"></i>
								</span>
							)}
							{review.rating <= 2 && (
								<span className="badge badge-danger text-white">
									{review.rating}{" "}
									<i className="fas fa-star"></i>
								</span>
							)}
							{review.rating === 3 && (
								<span className="badge badge-warning text-white">
									{review.rating}{" "}
									<i className="fas fa-star"></i>
								</span>
							)}
						</div>
						<div className="text-capitalize">
							<b>{review.reviewTitle}</b>
						</div>
					</div>
					<div className="mt-3">
						<p
							className="m-0"
							style={{
								borderLeft: "5px solid green",
								paddingLeft: "10px"
							}}
						>
							{review.reviewText}
						</p>
					</div>
					<div className="d-flex flex-row justify-content-between align-items-center flex-wrap w-100 mt-3">
						<div className="d-flex flex-row flex-wrap w-50 justify-content-start align-items-center">
							<div>
								<p className="m-0">
									<b className="disabled">
										{review.author.name}
										{", "}
									</b>
								</p>
							</div>
							<div>
								<p className="m-0">
									On{" "}
									{dateFormat(
										review.createdAt,
										"dddd, mmmm dS, yyyy"
									)}
								</p>
							</div>
						</div>
						<div className="d-flex flex-row ">
							<div className="d-flex flex-row flex-wrap justify-content-between align-items-center mr-3">
								<div>
									<i
										className="fas fa-thumbs-up text-secondary"
										style={{ fontSize: "20px" }}
									></i>
								</div>
								<div>{review.likes.length}</div>
							</div>
							<div className="d-flex flex-row ">
								<div>
									<i
										className="fas fa-thumbs-down text-secondary"
										style={{ fontSize: "20px" }}
									></i>
								</div>
								<div>{review.dislikes.length}</div>
							</div>
						</div>
					</div>
					<div className="delete-review">
						<div className="btn-group dropleft">
							<div
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<i className="fas fa-ellipsis-h"></i>
							</div>
							<div className="dropdown-menu p-1">
								<button
									className="dropdown-item bg-danger text-white"
									onClick={this.handleDelete}
								>
									Delete
								</button>
								<button
									className="dropdown-item bg-warning text-white mt-1"
									data-toggle="modal"
									data-target={`#a${review._id}`}
								>
									Update
								</button>
							</div>
							{/* MODAL START /////////////////////////////////////////////////////////////////////////////////// */}
							<div
								className="modal fade"
								id={`a${review._id}`}
								tabIndex="-1"
								role="dialog"
								aria-labelledby="exampleModalLabel"
								aria-hidden="true"
							>
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5
												className="modal-title"
												id="exampleModalLabel"
											>
												Update Review
											</h5>
											<button
												type="button"
												className="close"
												data-dismiss="modal"
												aria-label="Close"
											>
												<span aria-hidden="true">
													&times;
												</span>
											</button>
										</div>
										<form>
											<div className="modal-body">
												<div className="form-group">
													<label htmlFor="review-t">
														<b>Review Title</b>
													</label>
													<input
														type="text"
														className="form-control"
														id="review-t"
														placeholder="Write the title of your review here."
														defaultValue={
															review.reviewTitle
														}
														onChange={(event) => {
															this.inputChangeHandler(
																"reviewTitle",
																event
															);
														}}
													/>
												</div>
												<div className="form-group">
													<label htmlFor="review-r">
														<b>Star Rating</b>
													</label>
													<select
														className="form-control"
														id="review-r"
														defaultValue={
															review.rating
														}
														onChange={(event) => {
															this.inputChangeHandler(
																"rating",
																event
															);
														}}
													>
														<option value="1">
															1
														</option>
														<option value="2">
															2
														</option>
														<option value="3">
															3
														</option>
														<option value="4">
															4
														</option>
														<option value="5">
															5
														</option>
													</select>
												</div>
												<div className="form-group">
													<label htmlFor="review-txt">
														<b>Review text</b>
													</label>
													<textarea
														className="form-control"
														id="review-txt"
														rows="3"
														placeholder="What do you think about this product?"
														defaultValue={
															review.reviewText
														}
														onChange={(event) => {
															this.inputChangeHandler(
																"reviewText",
																event
															);
														}}
													></textarea>
												</div>
											</div>
											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-secondary"
													data-dismiss="modal"
												>
													Close
												</button>
												<button
													type="submit"
													className="btn btn-warning"
													onClick={this.handleSubmit}
												>
													Update
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
							{/* MODAL END  ///////////////////////////////////////////////////////////////////////////////////*/}
						</div>
					</div>
				</div>
			);
		}
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(Review);
