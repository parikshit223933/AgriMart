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
            console.log(newURI)
            $('.image-container-left-section').css('background-image', "url('"+newURI+"')");
            $('.image-container-left-section').css('background-position', "center");
            $('.image-container-left-section').css('background-repeat', "no-repeat");
            $('.image-container-left-section').css('background-size', "cover");
        }
    }
    render()
    {
        const {product}=this.props;
        return(
            <div className="single-product mt-2 mb-2 flex-row d-flex p-2">
                <div className="image-container-left-section">
                </div>
                <div className="details-container p-1 d-flex flex-column justify-content-lg-start align-items-start">
                    <div >
                        {product.name}
                    </div>
                    <div>
                        ({product.category})
                    </div>
                    <div>
                        Rs. {product.price}
                    </div>
                    <div>
                        Remaining: {product.remainingQuantity}
                    </div>
                </div>
            </div>
        );
    }
}
export default SingleProduct;