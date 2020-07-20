import React from "react";
import * as $ from "jquery";

class ReviewHeader extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		const { product } = this.props;
		if (product) {
			$("#five").width((product.five / product.reviews.length) * 120);
			$("#four").width((product.four / product.reviews.length) * 120);
			$("#three").width((product.three / product.reviews.length) * 120);
			$("#two").width((product.two / product.reviews.length) * 120);
			$("#one").width((product.one / product.reviews.length) * 120);
		}
	}
	render() {
		const { product } = this.props;
		return (
			<div>
				<div className="d-flex justify-content-around align-items-center flex-row flex-wrap">
					<div className="d-flex justify-content-center align-items-center flex-column ratings-desc m-1 p-2">
						<div>
							<p className="m-0">
								{!product.reviews.length
									? 0
									: (product.one +
											product.two +
											product.three +
											product.four +
											product.five) /
									  product.reviews.length}{" "}
								stars,
							</p>
						</div>
						<div>
							<p className="m-0">
								{" "}
								{product.one +
									product.two +
									product.three +
									product.four +
									product.five}{" "}
								ratings &
							</p>
						</div>
						<div>
							<p className="m-0">
								{product.reviews.length} reviews
							</p>
						</div>
					</div>
					<small className="d-flex justify-content-center align-items-center flex-column p-2 m-1">
						<div className="d-flex justify-content-center align-items-center flex-row">
							<div>
								<p className="m-0">
									5 <i className="fas fa-star"></i>
								</p>
							</div>
							<div>
								<div className="bar">
									<div id="five" className="filler"></div>
								</div>
							</div>
							<div>{product.five}</div>
						</div>
						<div className="d-flex justify-content-center align-items-center flex-row">
							<div>
								<p className="m-0">
									4 <i className="fas fa-star"></i>
								</p>
							</div>
							<div>
								<div className="bar">
									<div id="four" className="filler"></div>
								</div>
							</div>
							<div>{product.four}</div>
						</div>
						<div className="d-flex justify-content-center align-items-center flex-row">
							<div>
								<p className="m-0">
									3 <i className="fas fa-star"></i>
								</p>
							</div>
							<div>
								<div className="bar">
									<div id="three" className="filler"></div>
								</div>
							</div>
							<div>{product.three}</div>
						</div>
						<div className="d-flex justify-content-center align-items-center flex-row">
							<div>
								<p className="m-0">
									2 <i className="fas fa-star"></i>
								</p>
							</div>
							<div>
								<div className="bar">
									<div id="two" className="filler"></div>
								</div>
							</div>
							<div>{product.two}</div>
						</div>
						<div className="d-flex justify-content-center align-items-center flex-row">
							<div>
								<p className="m-0">
									1 <i className="fas fa-star"></i>
								</p>
							</div>
							<div>
								<div className="bar">
									<div id="one" className="filler"></div>
								</div>
							</div>
							<div>{product.one}</div>
						</div>
					</small>
				</div>
			</div>
		);
	}
}
export default ReviewHeader;
