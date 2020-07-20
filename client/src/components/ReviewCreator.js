import React from "react";

class ReviewCreator extends React.Component {
	render() {
        console.log(this.props)
		return (
			<form className="p-3 apply-shadow">
				<h5>Write a Review...</h5>
				<div className="form-group">
					<label htmlFor="review-title">
						Review Title
					</label>
					<input
						type="email"
						className="form-control"
						id="review-title"
						placeholder="name@example.com"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="review-rating">
						Star Rating
					</label>
					<select
						className="form-control"
                        id="review-rating"
                        defaultValue="5"
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="review-text">
						Review text
					</label>
					<textarea
						className="form-control"
						id="review-text"
                        rows="3"
                        placeholder="What do you think about this product?"
					></textarea>
				</div>
			</form>
		);
	}
}
export default ReviewCreator;
