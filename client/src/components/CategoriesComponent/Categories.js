import React from "react";
import "../../category.css";
import { Link } from 'react-router-dom';

class Categories extends React.Component
{
    render()
    {
        return (
            <div className="container-fluid category-component bg-warning">
                <div className="row">
                    <div className="col-md-10 offset-md-1 pt-4 bg-light">
                        <h1 className="all-categories-heading text-center">
                            Explore All Categories...
						</h1>
                        <hr />
                        <div className="w-100 d-flex flex-wrap flex-row justify-content-center align-items-center pb-5 pt-3">
                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://img3.stockfresh.com/files/f/finpoints/m/23/7766976_stock-photo-pulses-food-background-assortment---legume-kidney-beans-peas-lentils-in-square-cells-macro.jpg')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Cereals And Pulses
									</h5>
                                    <p className="card-text">
                                        This includes Barley, Wheat, Maize, Rice, Rye, Pinto Bean, Garden Pea, ChickPea, Velvet Bean, Ground Nuts, e.t.c.
									</p>
                                    <Link to="/categories/CerealsAndPulses" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>
                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://5.imimg.com/data5/ED/FU/MY-1051022/vegetable-seeds-500x500.jpeg')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">Seeds</h5>
                                    <p className="card-text">
                                        This includes Basil Seeds, Cumin Seeds, Dill Seeds, Mustard Seeds, Sunflower Seeds, Linseed, Cotton Seeds, e.t.c.
									</p>
                                    <Link to="/categories/Seeds" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>
                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://5.imimg.com/data5/EK/LK/MY-24207714/indian-spices-500x500.jpg')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">Spices</h5>
                                    <p className="card-text">
                                        This includes Black Pepper, Salt, Chilli Powder, Cinnamon, Cloves, Coriander, Cumin, Curry Powder, Ginger, Dry Red Chilly, Chat Masala, Garam Masala, Turmeric, Asafoetida/Hing, e.t.c.
									</p>
                                    <Link to="/categories/Spices" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>
                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://img.etimg.com/thumb/width-640,height-480,imgsize-322201,resizemode-1,msid-75714944/magazines/panache/doctors-suggest-having-fruits-could-help-keep-coronavirus-at-bay/doctors-also-stressed-the-need-to-continue-to-take-precautions-such-as-having-a-good-diet-and-trying-to-keep-away-from-polluted-or-smoky-areas-.jpg')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">Fruits</h5>
                                    <p className="card-text">
                                        This includes Banana, Apple, Mango, Guava, Grapes, Apricot, BlueBerry, Strawberry, Jamun, Oranges, Water Melon, e.t.c.
									</p>
                                    <Link to="/categories/Fruits" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>

                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">Vegetables</h5>
                                    <p className="card-text">
                                        This includes Carrots, Lady Finger, French Beans, Potato, Cucumber, Msuhroom, Bell Pepper, Bitter Gourd, Leek, Peas, e.t.c.
									</p>
                                    <Link to="/categories/Vegetables" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>
                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://images-eu.ssl-images-amazon.com/images/I/61f%2BBoiUTGL._SY300_QL70_ML2_.jpg')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">Dry Fruits</h5>
                                    <p className="card-text">
                                        This includes Cashew Nut, Almond, Raisins, Pistachio, Peanut, Apricot, Dried Peaches, Figs, Pumpkin Seeds, Pine Nuts, e.t.c.
									</p>
                                    <Link to="/categories/DryFruits" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>
                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://m.economictimes.com/thumb/height-450,width-600,imgsize-199230,msid-76194134/edible-oil.jpg')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">Edible Oils</h5>
                                    <p className="card-text">
                                        This includes Castor Oil, Coconut Oil, Vegetable Oil, Cumin Seed Oil, Celery Seed Oil, Mustard Oil, Sunflower Oil, Cotton Seed Oil, e.t.c.
									</p>
                                    <Link to="/categories/EdibleOils" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>
                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://www.healthline.com/hlcmsresource/images/AN_images/AN480-Eggs-Dairy-732x549-thumb.jpg')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Dairy Products
									</h5>
                                    <p className="card-text">
                                        This includes Cheese Spread, Milk, Condensed Milk, Powdered Milk, Cream, Ice Cream, Cottage Cheese (Paneer), Shrikhand, Ghee, Butter, Flavoured Milk, e.t.c.
									</p>
                                    <Link to="/categories/DairyProducts" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>
                            <div
                                className="card m-2 prod-card"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    style={{
                                        height: 286,
                                        backgroundImage: `url('https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/317/317728/honey-in-a-pot.jpg?w=1155&h=1541')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        maxWidth: 286
                                    }}
                                ></div>
                                <div className="card-body">
                                    <h5 className="card-title">Others</h5>
                                    <p className="card-text">
                                        This includes Natural Honey, Sugar, Soya Meals, Jaggery, Natural Dyes and Pigments, Dehydrated vegetables, Vinegar, e.t.c.
									</p>
                                    <Link to="/categories/Others" className="btn btn-warning">
                                        View All
									</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;
