import React from 'react';
import { API_URLS } from '../../helpers/urls';
import * as $ from 'jquery';

class SingleProduct extends React.Component
{
    componentDidMount()
    {
        if(this.props.product)
        {
            const {product}=this.props;
            let firstPart=API_URLS.profilePictureRoot()+'/uploads/products/coverImage-'
            let secondPart=product.coverImage.split('-')[product.coverImage.split('-').length-1];
            let newURI=firstPart+secondPart;
            $(`.${this.props.productId}`).css('background-image', "url('"+newURI+"')");
            $(`.${this.props.productId}`).css('background-position', "center");
            $(`.${this.props.productId}`).css('background-repeat', "no-repeat");
            $(`.${this.props.productId}`).css('background-size', "cover");
        }
    }
    render()
    {
        const {product}=this.props;
        return(
            <div className="single-product mt-2 mb-2 flex-row d-flex p-2">
                <div className={`image-container-left-section ${this.props.productId}`}>
                </div>
                <div className="details-container p-1 d-flex flex-column justify-content-lg-start align-items-start">
                    <div >
                        {product.name} ({product.category})
                    </div>
                    <hr/>
                    <div>
                        <b>Rs.</b> {product.price}
                    </div>
                    <hr/>
                    {this.props.showRemaining&&<div>
                        <b>Remaining:</b> {product.remainingQuantity} Standard Units
                    </div>}
                    {this.props.showBuyers&&<div>
                        <b>Buyers:</b> {product.Buyers.length}
                    </div>}
                </div>
            </div>
        );
    }
}
export default SingleProduct;