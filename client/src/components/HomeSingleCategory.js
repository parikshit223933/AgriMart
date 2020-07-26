import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";

const MenuItem = ({ text }) => {
	return <div className={`menu-item`}>{text}</div>;
};

export const Menu = (list) =>
	list.map((el, index) => {
		const { name } = el;

		return <MenuItem text={name} key={index} />;
	});

const Arrow = ({ text, className }) => {
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

class HomeSingleCategory extends React.Component {
	render() {
		if (!this.props.products) {
			return <h6>Nothing To Show Here!</h6>;
		}

        /* Fill up the list here! */
        this.list=[]
		for (let product of this.props.products) {
			this.list.push({
				name: (
					<div  className="card prod-card" style={{width: '10rem', backgroundColor:'transparent'}}>
                        <div
							style={{
								height: 200,
								backgroundImage: `url('http://localhost:8000/uploads/products/coverImage-${product.coverImage.split('-')[1]}')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
							}}
						></div>
						{/* <img
							src={`http://localhost:8000/${product.coverImage}`}
							className="card-img-top"
							alt={product.category}
						/> */}
						<div className="card-body text-capitalize">
							<h5>{product.name}</h5>
							<p className="card-text">
								<b>Rs. {product.price}</b>
							</p>
						</div>
					</div>
				)
			});
		}
        this.menuItems = Menu(this.list);
        const menu = this.menuItems;
		return (
			<ScrollMenu
				data={menu}
				arrowLeft={ArrowLeft}
				arrowRight={ArrowRight}
				alignCenter={true}
				alignOnResize={true}
				wheel={false}
				hideArrows={true}
				scrollBy={1}
			/>
		);
	}
}
export default HomeSingleCategory;
