import React from "react";
import { showNotification } from "../helpers/utils";
import { clearProductState } from "../actions/product";
import { connect } from 'react-redux';

class ReviewCreator extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            reviewText: "",
            reviewTitle: "",
            rating: 5
        };//see the componentDidMountFunction
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
    componentDidUpdate(prevProps, prevState)
    {
        const { success, error } = this.props.product;
        if (success)
        {
            showNotification(success, 1500, 'success');
            this.props.dispatch(clearProductState());
        }
        else if (error)
        {
            showNotification(error, 1500, 'error');
            this.props.dispatch(clearProductState());
        }
    }
    checkReviews = (reviews) =>
    {
        for (let review of reviews)
        {
            if (review.author._id === this.props.auth.user._id)
            {
                return false;
            }
        }
        return true;
    }
    render()
    {
        if (this.props.auth.inProgress)
        {
            return (
				<div className="spinner-border text-warning text-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
			);
        }
        const creationAllowed = this.checkReviews(this.props.reviews);

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
                        disabled={!creationAllowed}
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
                        disabled={!creationAllowed}
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
                        disabled={!creationAllowed}
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
                        disabled={!creationAllowed}
                    >
                        Submit
					</button>
                </div>
            </form>
        );
    }
}
function mapStateToProps({ auth })
{
    return { auth };
}
export default connect(mapStateToProps)(ReviewCreator);
