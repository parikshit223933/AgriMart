import React from "react";
import * as $ from "jquery";
import ScrollReveal from 'scrollreveal';

class Sell extends React.Component {
	componentDidMount() {
		$(".sell-one").removeClass("d-none");
		setTimeout(function () {
			$(".sell-two").addClass("animate__fadeInTopLeft");
			$(".sell-two").removeClass("d-none");
		}, 800);
		setTimeout(function () {
			$(".sell-three").addClass("animate__fadeInTopLeft");
			$(".sell-three").removeClass("d-none");
        }, 1600);
        
        this.activateScrollReveal()
    }
    activateScrollReveal=()=>
    {
        ScrollReveal().reveal('.sell-intro');
        ScrollReveal().reveal('.container-fluid');
    }
	render() {
		return (
			<div className="sell-component">
				<div className="sell-intro">
					<div className="gradient-wrapper">
						<div className="sell-one animate__animated animate__fadeInTopLeft d-none">
							<img
								src="https://pngimg.com/uploads/welcome/welcome_PNG60.png"
								alt="welcome"
							/>
						</div>
						<div className="sell-two animate__animated d-none">
							Agrimart
						</div>
						<div className="sell-three animate__animated d-none">
							<img
								src="https://uxwing.com/wp-content/themes/uxwing/download/19-ecommerce-shopping/sell-label.png"
								alt="sell"
							/>
						</div>
					</div>
				</div>
                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
				<div className="container-fluid bg-warning">
				    <div className="row">
				        <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3 bg-light my-5 p-5">
        					<h1 className="text-center pb-4">
                                Start Selling...
                            </h1>
                            <form>
        						<div className="form-group">
        							<label htmlFor="name">
        								Name
        							</label>
        							<input
        								type="text"
        								className="form-control"
        								id="name"
                                        aria-describedby="name"
                                        placeholder="Enter your name here"
        							/>
        						</div>
                                <div className="form-group">
        							<label htmlFor="email">
        								Price
        							</label>
        							<input
        								type="number"
        								className="form-control"
        								id="email"
                                        aria-describedby="email"
                                        placeholder="Price of the entity"
        							/>
        						</div>
                                <div className="form-group">
        							<label htmlFor="image">
        								Image Url
        							</label>
        							<input
        								type="text"
        								className="form-control"
        								id="image"
                                        aria-describedby="image"
                                        placeholder="URL of the image"
        							/>
        						</div>
                                <div className="form-group">
        							<label htmlFor="description">
        								Description
        							</label>
        							<input
        								type="text"
        								className="form-control"
        								id="description"
                                        aria-describedby="description"
                                        placeholder="Describe this entity"
        							/>
        						</div>
                                <div className="form-group">
        							<label htmlFor="category">
        								Category
        							</label>
        							<input
        								type="text"
        								className="form-control"
        								id="category"
                                        aria-describedby="category"
                                        placeholder="Category of entity"
        							/>
        						</div>
                                <div className="form-group">
        							<label htmlFor="min-qty">
        								Minimum Order Quantity
        							</label>
        							<input
        								type="number"
        								className="form-control"
        								id="min-qty"
                                        aria-describedby="min-qty"
                                        placeholder="Minimum cost of the entity"
        							/>
        						</div>
        						<button type="submit" className="btn btn-primary">
        							Submit
        						</button>
        					</form>
        				</div>
				    </div>
				</div>
			</div>
		);
	}
}

export default Sell;
