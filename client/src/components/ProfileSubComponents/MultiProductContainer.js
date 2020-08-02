import React from "react";
import { SingleProductBox } from "..";
import {connect} from 'react-redux';
import { showNotification } from "../../helpers/utils";
import { clearProductState } from "../../actions/product";

class MultiProductContainer extends React.Component {
    componentDidUpdate(prevProps, prevState)
    {
        if(prevProps.products.length!==this.props.products.length)
        {
            console.log(prevProps.products.length, this.props.products.length)
            const {deleteSuccess, deleteError}=this.props;
            console.log(deleteSuccess, deleteError)
            if(deleteSuccess)
            {
                showNotification(deleteSuccess, 1500, 'success');
                this.props.dispatch(clearProductState());
            }
            else if (deleteError)
            {
                showNotification(deleteError, 1500, 'error');
                this.props.dispatch(clearProductState());
            }
        }
    }
	render() {
		const { products } = this.props;
		if (!products) {
			return <div>Loading...</div>;
		}
		let totalItems = 0;
		return (
			<div className="d-flex flex-wrap flex-row justify-content-around align-items-center MPC">
				{/* MPC denotes MultiProductContainer */}
				{products.map((product, index) => {
					if (this.props.showBuyers && product.Buyers.length === 0) {
						return null; //this means that if i am on the sold tab then if the size of the buyers list is zero then I will not render that particular product box because no one bought it which means that is is not yet sold!
					}

					totalItems += 1;
					return (
						<SingleProductBox
							key={index}
							product={product}
							showRemaining={this.props.showRemaining}
							showBuyers={this.props.showBuyers}
							productId={product._id}
							editAllowed={this.props.editAllowed}
						/>
					);
				})}
				{!totalItems && this.props.showBuyers && (
					<div className="p-4">You haven't sold anything yet!</div>
				)}
				{/* If this.props.showBuyers is true, it means that i am currently on the "sold" tab. */}
				{!totalItems && this.props.showRemaining && (
					<div className="p-4">
						You haven't posted any product yet or all your products
						are sold out!
					</div>
				)}
				{/* If total items are 0 and this.props.showBuyers is false, it means that i am on the "unsold" tab and there are no products to show */}
				{!totalItems && this.props.showQtyBought && (
					<div className="p-4">
						You do not have any purchase history!
					</div>
				)}
			</div>
		);
	}
}
function mapStateToProps({product})
{
    return{
        deleteSuccess:product.success,
        deleteError:product.error
    }
}
export default connect(mapStateToProps)(MultiProductContainer);
