import React from 'react';
import { SingleProductBox } from '..';
class MultiProductContainer extends React.Component
{
    render()
    {
        const {products}=this.props;
        if(!products)
        {
            return<div>Loading...</div>
        }
        return(
            <div className="d-flex flex-wrap flex-row justify-content-around align-items-center MPC">{/* MPC denotes MultiProductContainer */}
                {products.map((product, index)=>
                {
                    return<SingleProductBox key={index} product={product}/>
                })}
            </div>
        )
    }   
}
export default MultiProductContainer;