import React from "react";

/* this component contains all the reviews */
class Review extends React.Component {
	render() {
        const {review}=this.props;
		return (
			<div className="apply-shadow d-flex flex-column justify-content-around align-items-start p-3">
				<div className="d-flex flex-row justify-content-start align-items-center">
					<div className="mr-3">
						<span className="badge badge-success">
							{review.rating} <i className="fas fa-star"></i>
						</span>
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
								<b className="disabled">{review.author}</b>
							</p>
						</div>
						<div>
							<p className="m-0">{review.createdAt}</p>
						</div>
					</div>
					<div className="d-flex flex-row ">
						<div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
							<div>
								<i
									className="fas fa-thumbs-up"
									style={{ fontSize: "30px" }}
								></i>
							</div>
							<div>{review.likes.length}</div>
						</div>
						<div className="d-flex flex-row ">
							<div>
								<i
									className="fas fa-thumbs-down"
									style={{ fontSize: "30px" }}
								></i>
							</div>
							<div>{review.dislikes.length}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Review;
