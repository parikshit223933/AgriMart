import React from "react";
import { connect } from "react-redux";
import { fetchCategorizedProducts } from "../actions/product";
import "../singleCategory.css";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

class SingleCategory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {
		this.FetchProducts();
	}
	getMinPrice = (products) => {
		let minPrice = Number.MAX_SAFE_INTEGER;
		for (let product of products) {
			if (product.price < minPrice) {
				minPrice = product.price;
			}
		}
		if (minPrice === Number.MAX_SAFE_INTEGER) {
			return 0;
		}
		return minPrice;
	};
	getMaxPrice = (products) => {
		let maxPrice = Number.MIN_SAFE_INTEGER;
		for (let product of products) {
			if (product.price > maxPrice) {
				maxPrice = product.price;
			}
		}
		if (maxPrice === Number.MIN_SAFE_INTEGER) {
			return 1000;
		}
		return maxPrice;
	};
	componentDidUpdate(prevProps) {
		//had to do this because the component did render
		//again when the props.match.params changed but the the API call function
		// did not get fired because the component is mounted only once and it
		//is already mounted at the time when the props changed.
		//So i made the api call again in the componentdidupdate life cycle method
		if (
			prevProps.match &&
			this.props.match &&
			prevProps.match.params.category !== this.props.match.params.category
		) {
			this.FetchProducts();
		}
	}
	categoryMapper = (categoryFromUrl) => {
		let category = "";
		switch (categoryFromUrl) {
			case "CerealsAndPulses":
				category = "Cereals and Pulses";
				break;
			case "Seeds":
				category = "Seeds";
				break;
			case "Spices":
				category = "Spices";
				break;
			case "Fruits":
				category = "Fruits";
				break;
			case "Vegetables":
				category = "Vegetables";
				break;
			case "DryFruits":
				category = "Dry Fruits";
				break;
			case "EdibleOils":
				category = "Edible Oils";
				break;
			case "DairyProducts":
				category = "Dairy Products";
				break;
			case "Others":
				category = "Others";
				break;
			default:
				category = "";
				break;
		}
		return category;
	};
	FetchProducts = () => {
		let category = this.categoryMapper(this.props.match.params.category);
		this.props.dispatch(fetchCategorizedProducts(category));
	};
	sortPriceAscending = (products) => {
		return [...products].sort(function (product1, product2) {
			if (product1.price < product2.price) {
				return -1;
			} else if (product1.price > product2.price) {
				return 1;
			} else {
				return 0;
			}
		});
	};
	sortPriceDescending = (products) => {
		return [...products].sort(function (product1, product2) {
			if (product1.price > product2.price) {
				return -1;
			} else if (product1.price < product2.price) {
				return 1;
			} else {
				return 0;
			}
		});
	};
	sortNewest = (products) => {
		return [...products].sort((a, b) => {
			if (
				Date.now() - new Date(a.createdAt) <
				Date.now() - new Date(b.createdAt)
			) {
				return -1;
			} else if (
				Date.now() - new Date(a.createdAt) >
				Date.now() - new Date(b.createdAt)
			) {
				return 1;
			}
			return 0;
		});
	};
	render() {
		const { categorizedProducts, inProgress } = this.props.product;
		if (inProgress) {
			return (
				<div className="text-center pt-5">
					<div
						className="spinner-border text-warning"
						role="status"
						style={{ width: "5rem", height: "5rem" }}
					>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}

		let PriceAscending = this.sortPriceAscending(categorizedProducts);
		let PriceDescending = this.sortPriceDescending(categorizedProducts);
		let Newest = this.sortNewest(categorizedProducts);
        let minPrice=this.getMinPrice(categorizedProducts);
        let maxPrice=this.getMaxPrice(categorizedProducts);

		return (
			<div className="container-fluid categorized-products">
				<div className="row">
					<div className="col-md-3 pt-4">
						<h4>Filters</h4>
						<div className="accordion" id="accordionExample">
							<div className="card">
								<div className="card-header" id="headingOne">
									<h2 className="mb-0">
										<button
											className="btn btn-link btn-block text-left"
											type="button"
											data-toggle="collapse"
											data-target="#collapseOne"
											aria-expanded="true"
											aria-controls="collapseOne"
										>
											Price Range
										</button>
									</h2>
								</div>

								<div
									id="collapseOne"
									className="collapse show"
									aria-labelledby="headingOne"
									data-parent="#accordionExample"
								>
									<div className="card-body pt-5 pb-5">
										<InputRange
											maxValue={maxPrice}
											minValue={minPrice}
											value={
												this.state.priceRange || {
													min:
                                                    minPrice ,
													max:
														maxPrice 
												}
											}
                                            onChange={(value) =>
                                                {
                                                    let newRange={...value};
                                                    if(newRange.min<minPrice)
                                                    {
                                                        newRange.min=minPrice
                                                    }
                                                    if(newRange.max>maxPrice)
                                                    {
                                                        newRange.max=maxPrice
                                                    }
                                                    this.setState({ priceRange:newRange })
                                                }
											}
										/>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-header" id="headingTwo">
									<h2 className="mb-0">
										<button
											className="btn btn-link btn-block text-left collapsed"
											type="button"
											data-toggle="collapse"
											data-target="#collapseTwo"
											aria-expanded="false"
											aria-controls="collapseTwo"
										>
											Customer Rating
										</button>
									</h2>
								</div>
								<div
									id="collapseTwo"
									className="collapse"
									aria-labelledby="headingTwo"
									data-parent="#accordionExample"
								>
									<div className="card-body">...</div>
								</div>
							</div>
						</div>
					</div>

					{/* //////////////////////////////////////////////////////////////////////////////////////////// */}
					<div className="col-md-9 pt-3">
						<h1>
							{this.categoryMapper(
								this.props.match.params.category
							)}
						</h1>
						<ul
							className="nav nav-pills mb-3"
							id="pills-tab"
							role="tablist"
						>
							<li className="nav-item" role="presentation">
								<a href="/" className="nav-link disabled">
									Sort By:
								</a>
							</li>

							<li className="nav-item" role="presentation">
								<a
									className="nav-link active"
									id="pills-all-tab"
									data-toggle="pill"
									href="#pills-home"
									role="tab"
									aria-controls="pills-all"
									aria-selected="true"
								>
									Filters
								</a>
							</li>

							<li className="nav-item" role="presentation">
								<a
									className="nav-link"
									id="pills-home-tab"
									data-toggle="pill"
									href="#pills-home"
									role="tab"
									aria-controls="pills-home"
									aria-selected="false"
								>
									Price:{" "}
									<i className="fas fa-sort-amount-up-alt"></i>
								</a>
							</li>

							<li className="nav-item" role="presentation">
								<a
									className="nav-link"
									id="pills-profile-tab"
									data-toggle="pill"
									href="#pills-profile"
									role="tab"
									aria-controls="pills-profile"
									aria-selected="false"
								>
									Price:{" "}
									<i className="fas fa-sort-amount-up"></i>
								</a>
							</li>

							<li className="nav-item" role="presentation">
								<a
									className="nav-link"
									id="pills-contact-tab"
									data-toggle="pill"
									href="#pills-contact"
									role="tab"
									aria-controls="pills-contact"
									aria-selected="false"
								>
									Newest First
								</a>
							</li>
						</ul>
						<div className="tab-content" id="pills-tabContent">
							<div
								className="tab-pane fade show active"
								id="pills-all"
								role="tabpanel"
								aria-labelledby="pills-all-tab"
							>
								<div className="w-100 d-flex flex-row justify-content-around align-items-center flex-wrap">
                                    {/* if the price range is undefined (initially) then all the products will be loaded irrespective of the filters */}
									{!this.state.priceRange?categorizedProducts.map(
										(product, index) => {
											return (
												<div
													className="card prod-card mb-2 mt-2 ml-1 mr-1"
													style={{ width: "18rem" }}
													key={index}
												>
													<div
														style={{
															width: 286,
															height: 286,
															backgroundImage: `url('http://localhost:8000/uploads/products/coverImage-${
																product.coverImage.split(
																	"-"
																)[1]
															}')`,
															backgroundSize:
																"contain",
															backgroundPosition:
																"center",
															backgroundRepeat:
																"no-repeat"
														}}
													>
														{/* <img
    														src={`http://localhost:8000/${product.coverImage}`}
    														className="card-img-top"
    														alt="CoverImg"
    													/> */}
													</div>
													<div className="card-body">
														<h5 className="card-title text-capitalize mb-0">
															{product.name}{" "}
														</h5>
														<small>
															({product.category})
														</small>
														<p className="card-text mb-1">
															<b>
																Rs.
																{product.price}
															</b>
														</p>
														<p className="card-text">
															Rating:{" "}
															{product.rating}
														</p>
														<a
															href="/"
															className="btn btn-warning"
														>
															Add to Cart
														</a>
													</div>
												</div>
											);
										}
                                    ):categorizedProducts.filter(product=>
                                    {
                                        if(product.price>=this.state.priceRange.min&&product.price<=this.state.priceRange.max)
                                        {
                                            return true;
                                        }
                                        return false;
                                    }).map((product, index)=>
                                    {
                                        return (
                                            <div
                                                className="card prod-card mb-2 mt-2 ml-1 mr-1"
                                                style={{ width: "18rem" }}
                                                key={index}
                                            >
                                                <div
                                                    style={{
                                                        width: 286,
                                                        height: 286,
                                                        backgroundImage: `url('http://localhost:8000/uploads/products/coverImage-${
                                                            product.coverImage.split(
                                                                "-"
                                                            )[1]
                                                        }')`,
                                                        backgroundSize:
                                                            "contain",
                                                        backgroundPosition:
                                                            "center",
                                                        backgroundRepeat:
                                                            "no-repeat"
                                                    }}
                                                >
                                                    {/* <img
                                                        src={`http://localhost:8000/${product.coverImage}`}
                                                        className="card-img-top"
                                                        alt="CoverImg"
                                                    /> */}
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title text-capitalize mb-0">
                                                        {product.name}{" "}
                                                    </h5>
                                                    <small>
                                                        ({product.category})
                                                    </small>
                                                    <p className="card-text mb-1">
                                                        <b>
                                                            Rs.
                                                            {product.price}
                                                        </b>
                                                    </p>
                                                    <p className="card-text">
                                                        Rating:{" "}
                                                        {product.rating}
                                                    </p>
                                                    <a
                                                        href="/"
                                                        className="btn btn-warning"
                                                    >
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
								</div>
							</div>
							<div
								className="tab-pane fade"
								id="pills-home"
								role="tabpanel"
								aria-labelledby="pills-home-tab"
							>
								<div className="w-100 d-flex flex-row justify-content-around align-items-center flex-wrap">
									{PriceAscending.map((product, index) => {
										return (
											<div
												className="card prod-card mb-2 mt-2 ml-1 mr-1"
												style={{ width: "18rem" }}
												key={index}
											>
												<div
													style={{
														width: 286,
														height: 286,
														backgroundImage: `url('http://localhost:8000/uploads/products/coverImage-${
															product.coverImage.split(
																"-"
															)[1]
														}')`,
														backgroundSize:
															"contain",
														backgroundPosition:
															"center",
														backgroundRepeat:
															"no-repeat"
													}}
												>
													{/* <img
    														src={`http://localhost:8000/${product.coverImage}`}
    														className="card-img-top"
    														alt="CoverImg"
    													/> */}
												</div>
												<div className="card-body">
													<h5 className="card-title text-capitalize mb-0">
														{product.name}{" "}
													</h5>
													<small>
														({product.category})
													</small>
													<p className="card-text mb-1">
														<b>
															Rs.
															{product.price}
														</b>
													</p>
													<p className="card-text">
														Rating: {product.rating}
													</p>
													<a
														href="/"
														className="btn btn-warning"
													>
														Add to Cart
													</a>
												</div>
											</div>
										);
									})}
								</div>
							</div>
							<div
								className="tab-pane fade"
								id="pills-profile"
								role="tabpanel"
								aria-labelledby="pills-profile-tab"
							>
								<div className="w-100 d-flex flex-row justify-content-around align-items-center flex-wrap">
									{PriceDescending.map((product, index) => {
										return (
											<div
												className="card prod-card mb-2 mt-2 ml-1 mr-1"
												style={{ width: "18rem" }}
												key={index}
											>
												<div
													style={{
														width: 286,
														height: 286,
														backgroundImage: `url('http://localhost:8000/uploads/products/coverImage-${
															product.coverImage.split(
																"-"
															)[1]
														}')`,
														backgroundSize:
															"contain",
														backgroundPosition:
															"center",
														backgroundRepeat:
															"no-repeat"
													}}
												>
													{/* <img
    														src={`http://localhost:8000/${product.coverImage}`}
    														className="card-img-top"
    														alt="CoverImg"
    													/> */}
												</div>
												<div className="card-body">
													<h5 className="card-title text-capitalize mb-0">
														{product.name}{" "}
													</h5>
													<small>
														({product.category})
													</small>
													<p className="card-text mb-1">
														<b>
															Rs.
															{product.price}
														</b>
													</p>
													<p className="card-text">
														Rating: {product.rating}
													</p>
													<a
														href="/"
														className="btn btn-warning"
													>
														Add to Cart
													</a>
												</div>
											</div>
										);
									})}
								</div>
							</div>
							<div
								className="tab-pane fade"
								id="pills-contact"
								role="tabpanel"
								aria-labelledby="pills-contact-tab"
							>
								<div className="w-100 d-flex flex-row justify-content-around align-items-center flex-wrap">
									{Newest.map((product, index) => {
										return (
											<div
												className="card prod-card mb-2 mt-2 ml-1 mr-1"
												style={{ width: "18rem" }}
												key={index}
											>
												<div
													style={{
														width: 286,
														height: 286,
														backgroundImage: `url('http://localhost:8000/uploads/products/coverImage-${
															product.coverImage.split(
																"-"
															)[1]
														}')`,
														backgroundSize:
															"contain",
														backgroundPosition:
															"center",
														backgroundRepeat:
															"no-repeat"
													}}
												>
													{/* <img
    														src={`http://localhost:8000/${product.coverImage}`}
    														className="card-img-top"
    														alt="CoverImg"
    													/> */}
												</div>
												<div className="card-body">
													<h5 className="card-title text-capitalize mb-0">
														{product.name}{" "}
													</h5>
													<small>
														({product.category})
													</small>
													<p className="card-text mb-1">
														<b>
															Rs.
															{product.price}
														</b>
													</p>
													<p className="card-text">
														Rating: {product.rating}
													</p>
													<a
														href="/"
														className="btn btn-warning"
													>
														Add to Cart
													</a>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ product }) {
	return { product };
}
export default connect(mapStateToProps)(SingleCategory);
