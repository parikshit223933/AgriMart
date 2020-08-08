import React from "react";
import "../../home.css";
import { Link } from "react-router-dom";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { HomeSingleCategory } from "../";
import { getHomeProducts } from "../../actions/product";
import { connect } from "react-redux";
import { showNotification } from "../../helpers/utils";
import { clearAuthState } from "../../actions/auth";

// list of items
const list = [
    {
        name: (
            <Link
                to="/categories/CerealsAndPulses"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters h-100">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://img3.stockfresh.com/files/f/finpoints/m/23/7766976_stock-photo-pulses-food-background-assortment---legume-kidney-beans-peas-lentils-in-square-cells-macro.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Cereals And Pulses</h5>
                            <p className="card-text">
                                This includes Barley, Wheat, Maize, Rice, Rye,
                                Pinto Bean, Garden Pea, ChickPea, Velvet Bean,
                                Ground Nuts, e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    },
    {
        name: (
            <Link
                to="/categories/Seeds"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://5.imimg.com/data5/ED/FU/MY-1051022/vegetable-seeds-500x500.jpeg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Seeds</h5>
                            <p className="card-text">
                                This includes Basil Seeds, Cumin Seeds, Dill
                                Seeds, Mustard Seeds, Sunflower Seeds, Linseed,
                                Cotton Seeds, e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    },
    {
        name: (
            <Link
                to="/categories/Spices"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://5.imimg.com/data5/EK/LK/MY-24207714/indian-spices-500x500.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Spices</h5>
                            <p className="card-text">
                                This includes Black Pepper, Salt, Chilli Powder,
                                Cinnamon, Cloves, Coriander, Cumin, Curry
                                Powder, Ginger, Dry Red Chilly, Chat Masala,
                                e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    },
    {
        name: (
            <Link
                to="/categories/Fruits"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://img.etimg.com/thumb/width-640,height-480,imgsize-322201,resizemode-1,msid-75714944/magazines/panache/doctors-suggest-having-fruits-could-help-keep-coronavirus-at-bay/doctors-also-stressed-the-need-to-continue-to-take-precautions-such-as-having-a-good-diet-and-trying-to-keep-away-from-polluted-or-smoky-areas-.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Fruits</h5>
                            <p className="card-text">
                                This includes Banana, Apple, Mango, Guava,
                                Grapes, Apricot, BlueBerry, Strawberry, Jamun,
                                Oranges, Water Melon, e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    },
    {
        name: (
            <Link
                to="/categories/Vegetables"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Vegetables</h5>
                            <p className="card-text">
                                This includes Carrots, Lady Finger, French
                                Beans, Potato, Cucumber, Msuhroom, Bell Pepper,
                                Bitter Gourd, Leek, Peas, e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    },
    {
        name: (
            <Link
                to="/categories/DryFruits"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://images-eu.ssl-images-amazon.com/images/I/61f%2BBoiUTGL._SY300_QL70_ML2_.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Dry Fruits</h5>
                            <p className="card-text">
                                This includes Cashew Nut, Almond, Raisins,
                                Pistachio, Peanut, Apricot, Dried Peaches, Figs,
                                Pumpkin Seeds, Pine Nuts, e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    },
    {
        name: (
            <Link
                to="/categories/EdibleOils"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://m.economictimes.com/thumb/height-450,width-600,imgsize-199230,msid-76194134/edible-oil.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Edible Oils</h5>
                            <p className="card-text">
                                This includes Castor Oil, Coconut Oil, Vegetable
                                Oil, Cumin Seed Oil, Celery Seed Oil, Mustard
                                Oil, Sunflower Oil, Cotton Seed Oil, e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    },
    {
        name: (
            <Link
                to="/categories/DairyProducts"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://www.healthline.com/hlcmsresource/images/AN_images/AN480-Eggs-Dairy-732x549-thumb.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Dairy Products</h5>
                            <p className="card-text">
                                This includes Cheese Spread, Milk, Condensed
                                Milk, Powdered Milk, Cream, Ice Cream, Cottage
                                Cheese (Paneer), e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    },
    {
        name: (
            <Link
                to="/categories/Others"
                className="card"
                style={{ maxWidth: "400px", maxHeight: "200px" }}
            >
                <div className="row no-gutters">
                    <div className="col-4">
                        <div
                            style={{
                                height: 200,
                                backgroundImage: `url('https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/317/317728/honey-in-a-pot.jpg?w=1155&h=1541')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                maxWidth: 150
                            }}
                        ></div>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">Others</h5>
                            <p className="card-text">
                                This includes Natural Honey, Sugar, Soya Meals,
                                Jaggery, Natural Dyes and Pigments, Dehydrated
                                vegetables, Vinegar, e.t.c.
							</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
];

const MenuItem = ({ text }) =>
{
    return <div className={`menu-item`}>{text}</div>;
};

export const Menu = (list) =>
    list.map((el, index) =>
    {
        const { name } = el;

        return <MenuItem text={name} key={index} />;
    });

const Arrow = ({ text, className }) =>
{
    return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({
    text: <i className="fas fa-angle-left"></i>,
    className: "arrow-prev"
});
const ArrowRight = Arrow({
    text: <i className="fas fa-angle-right"></i>,
    className: "arrow-next"
});

class Home extends React.Component
{
    constructor(props)
    {
        super(props);
        // call it again if items count changes
        this.menuItems = Menu(list);
    }
    componentDidMount()
    {
        this.props.dispatch(getHomeProducts());
        const {success}=this.props.auth;
        if(success)
        {
            showNotification(success, 2000, 'success')
            this.props.dispatch(clearAuthState());
        }
    }
    render()
    {
        const menu = this.menuItems;
        if (this.props.product.inProgress||this.props.auth.inProgress)
        {
            return (
				<div
					style={{ height: "100vh", width: "100vh" }}
					className="d-flex flex-column justify-content-center align-items-center ml-auto mr-auto"
				>
					<div
						className="spinner-border text-danger"
						role="status"
						style={{ width: "10rem", height: "10rem" }}
					>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
        }
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
                <div className="hrzntl-scrll mt-3 mb-1 pt-3 pb-5">
                    <p className="display-4 pl-3">Categories</p>
                    <ScrollMenu
                        data={menu}
                        arrowLeft={ArrowLeft}
                        arrowRight={ArrowRight}
                        alignCenter={false}
                        alignOnResize={false}
                        wheel={false}
                        hideArrows={true}
                        scrollBy={1}
                    />
                </div>
                <hr />
                <div className="container-fluid pl-0 pr-0 mb-5">
                    <p className="display-4 pl-3">Our Products</p>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Cereals and Pulses</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Cereals and Pulses"
                                        ]
                                    }
                                />
                            )}
                    </div>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Seeds</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Seeds"
                                        ]
                                    }
                                />
                            )}
                    </div>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Spices</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Spices"
                                        ]
                                    }
                                />
                            )}
                    </div>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Fruits</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Fruits"
                                        ]
                                    }
                                />
                            )}
                    </div>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Vegetables</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Vegetables"
                                        ]
                                    }
                                />
                            )}
                    </div>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Dry Fruits</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Dry Fruits"
                                        ]
                                    }
                                />
                            )}
                    </div>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Edible Oils</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Edible Oils"
                                        ]
                                    }
                                />
                            )}
                    </div>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Dairy Products</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Dairy Products"
                                        ]
                                    }
                                />
                            )}
                    </div>
                    <div className="w-100 categ">
                        <h4 className="pl-3">Others</h4>
                        {!this.props.product.homeProducts ? (
                            "Loading..."
                        ) : (
                                <HomeSingleCategory
                                    products={
                                        this.props.product.homeProducts[
                                        "Other"
                                        ]
                                    }
                                />
                            )}
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps({ product, auth })
{
    return { product, auth };
}

export default connect(mapStateToProps)(Home);
