import React from 'react';

class SingleProductInCategory extends React.Component
{
    render()
    {
        const {product, index}=this.props;
        return (
            <div
                className="card prod-card mb-2 mt-2 ml-1 mr-1"
                style={{
                    width: "18rem"
                }}
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
                        {
                            product.name
                        }{" "}
                    </h5>
                    <small>
                        (
                        {
                            product.category
                        }
                        )
                    </small>
                    <p className="card-text mb-1">
                        <b>
                            Rs.
                            {
                                product.price
                            }
                        </b>
                    </p>
                    <p className="card-text">
                        Rating:{" "}
                        {
                            product.rating
                        }
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
}
export default SingleProductInCategory;