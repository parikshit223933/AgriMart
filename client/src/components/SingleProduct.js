import React from "react";
import { connect } from "react-redux";
import "../singleProduct.css";
import { getSingleProduct } from "../actions/product";

class SingleProduct extends React.Component {
    componentDidMount()
    {
        this.props.dispatch(getSingleProduct(this.props.match.params.productId));
        
    }
    render() {
        console.log(this.props);
		return (
			<div className="container single-product-component">
				<div className="row">
                    <div className="col-sm-5">

                    </div>
                    <div className="col-sm-7">

                    </div>
                </div>
			</div>
		);
	}
}

export default connect()(SingleProduct);
