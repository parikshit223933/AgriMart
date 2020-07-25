import React from "react";
import "../home.css";
import { Link } from "react-router-dom";
class Home extends React.Component {
	render() {
		return (
			<div className="home-component">
				<div className="grad-cover">
					<div className="bg-grad p-3">
						<div className="upper-nav d-flex flex-sm-row flex-col justify-content-center align-items-center flex-wrap justify-content-sm-between align-items-sm-center">
							<div className="logo pl-2 pr-4">Agrimart</div>
							<form className="my-2 my-lg-0 d-flex flex-row justify-content-center align-items-center">
								<div className="search-bar-container ml-2 mr-2">
									<input
										className="form-control mr-sm-2"
										type="search"
										placeholder="Search"
										aria-label="Search"
									/>
								</div>
								<div>
									<button
										className="btn btn-success my-2 my-sm-0"
										type="submit"
									>
										<i className="fas fa-search"></i> Search
									</button>
								</div>
							</form>
						</div>
						{/* this was the upper nav bar */}
						<div className="jumbotron">
							<h1 className="display-4">
								The Agricultural Ecommerce
							</h1>
							<p className="lead">
								Heart of Pure Agricultural Ecommerce. Made in
								India, OpenSourced on GITHUB.{" "}
								<span role="img" aria-labelledby="heart">
									❤️
								</span>
							</p>
							<hr className="my-4" />
							<p>
								From helping the farmers and distributors, all
								across India in expanding their business to
								providing agricultural produce to their
								customers all across the country, we aim to grow
								together for a better and a healthy future.
							</p>

							<Link
								className="btn btn-primary btn-lg"
								to="/more-info"
								role="button"
							>
								Learn more
							</Link>
						</div>
					</div>
				</div>
                <div>
                    
                </div>
			</div>
		);
	}
}

export default Home;
