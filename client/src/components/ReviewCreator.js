import React from "react";

class ReviewCreator extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            reviewText: "",
            reviewTitle: "",
            rating: 5
        };
    }
    inputHandler = (key, event) =>
    {
        this.setState({
            [key]: event.target.value
        });
    };
    componentDidMount()
    {
        this.setState({
            author: this.props.match.params.userId,
            product: this.props.match.params.productId
        });
    }

    render()
    {
        return (
            <form className="p-3 apply-shadow">
                <h5>Write a Review...</h5>
                <div className="form-group">
                    <label htmlFor="review-title">
                        <b>Review Title</b>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="review-title"
                        placeholder="Write the title of your review here."
                        onChange={(event) =>
                        {
                            this.inputHandler("reviewTitle", event);
                        }}
                        value={this.state.reviewTitle}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="review-rating">
                        <b>Star Rating</b>
                    </label>
                    <select
                        className="form-control"
                        id="review-rating"
                        onChange={(event) =>
                        {
                            this.inputHandler("rating", event);
                        }}
                        value={this.state.rating}
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
                        <b>Review text</b>
                    </label>
                    <textarea
                        className="form-control"
                        id="review-text"
                        rows="3"
                        placeholder="What do you think about this product?"
                        onChange={(event) =>
                        {
                            this.inputHandler("reviewText", event);
                        }}
                        value={this.state.reviewText}
                    ></textarea>
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        onClick={(event) => { this.props.handleSubmitInReviewCreator(event, this.state) }}
                        className="btn btn-primary"
                    >
                        Submit
					</button>
                </div>
            </form>
        );
    }
}
export default ReviewCreator;
