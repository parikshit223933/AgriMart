import React from "react";
import { connect } from "react-redux";
import { fetchCategorizedProducts } from "../actions/product";

class SingleCategory extends React.Component {
	FetchProducts = () => {
		let category = "";
		switch (this.props.match.params.category) {
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
		this.props.dispatch(fetchCategorizedProducts(category));
    };
    componentDidMount()
    {
        this.FetchProducts();
    }
	componentDidUpdate(prevProps) {
        console.log('updated')
        if(prevProps.match&&this.props.match&&prevProps.match.params.category!==this.props.match.params.category)
        {
            this.FetchProducts();
        }
    }
	render() {
		return <div>This is the single Category Component.</div>;
	}
}

export default connect()(SingleCategory);
