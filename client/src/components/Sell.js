import React from 'react';
import * as $ from 'jquery';

class Sell extends React.Component
{
    componentDidMount()
    {
        $('.sell-one').removeClass('d-none');
        setTimeout(function()
        {
            $('.sell-two').addClass('animate__fadeInTopLeft');
            $('.sell-two').removeClass('d-none');
        }, 800);
        setTimeout(function()
        {
            $('.sell-three').addClass('animate__fadeInTopLeft');
            $('.sell-three').removeClass('d-none');
        }, 1600);
    }
    render()
    {
        return (
            <div className="sell-component">
                <div className="sell-intro">
                    <div className="gradient-wrapper">
                        <div className="sell-one animate__animated animate__fadeInTopLeft d-none">
                            <img src="https://pngimg.com/uploads/welcome/welcome_PNG60.png" alt="welcome"/>
                        </div>
                        <div className="sell-two animate__animated d-none">
                            Agrimart
                        </div>
                        <div className="sell-three animate__animated d-none">
                            <img src='https://uxwing.com/wp-content/themes/uxwing/download/19-ecommerce-shopping/sell-label.png' alt="sell"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sell;