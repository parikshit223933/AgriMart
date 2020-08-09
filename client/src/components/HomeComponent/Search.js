import React from "react";
import { connect } from "react-redux";
import { API_URLS } from "../../helpers/urls";
import { getFormBody } from "../../helpers/utils";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            searchtext: "",
            products:[]
		};
	}
	handleSearch = (event) => {
		/* WARNING: THE STORE SHOULD NOT BE UPDATED, BECAUSE IT WILL TRIGGER A RE-RENDER OF ALL THE COMPONENTS USING THE STORE AND HENCE THE WHOLE HOME PAGE WILL BE REFRESHED, WHICH WILL MAKE IT DIFFICULT FOR THE USER TO PROVIDE CONTINiOUS INPUT IN THE SEARCH BAR */
		event.preventDefault();
		this.setState(
			{
				searchtext: event.target.value
			},
			() => {
				if (!this.state.searchtext) {
					return;
				}
				let url = API_URLS.searchProducts();
				let searchStr = this.state.searchtext;
				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: getFormBody({ searchStr })
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.success) {
                            console.log(data.data.products);
                            this.setState({
                                products:data.data.products
                            })
						} else {
							console.log(data.message);
						}
					});
			}
		);
	};
	render() {
		return (
			<input
				className="form-control mr-sm-2"
				type="search"
				placeholder="Search"
				aria-label="Search"
				onChange={this.handleSearch}
				value={this.state.searchtext}
			/>
		);
	}
}
export default connect()(Search);
