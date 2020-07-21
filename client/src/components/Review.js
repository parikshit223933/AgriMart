import React from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { deleteReview } from "../actions/product";

/* this component contains all the reviews */
class Review extends React.Component {
    handleDelete=()=>
    {
        console.log(this.props.review.product, this.props.review._id);
        this.props.dispatch(deleteReview(this.props.review.product, this.props.review._id, this.props.auth.user._id));
    }
	render() {
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
								<button className="dropdown-item bg-danger text-white" onClick={this.handleDelete} href="#">
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
function mapStateToProps({auth})
{
    return {auth};
}
export default connect(mapStateToProps)(Review);
