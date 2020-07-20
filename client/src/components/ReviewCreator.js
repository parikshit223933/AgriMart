import React from "react";

class ReviewCreator extends React.Component {
	render() {
		return (
			<form className="p-3 apply-shadow">
				<h5>Write a Review...</h5>
				<div className="form-group">
					<label htmlFor="exampleFormControlInput1">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder="name@example.com"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleFormControlSelect1">
						Star Rating
					</label>
					<select
						className="form-control"
						id="exampleFormControlSelect1"
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="exampleFormControlTextarea1">
						Example textarea
					</label>
					<textarea
						className="form-control"
						id="exampleFormControlTextarea1"
						rows="3"
					></textarea>
				</div>
			</form>
		);
	}
}
export default ReviewCreator;
