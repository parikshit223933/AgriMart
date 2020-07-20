import React from "react";
import { MultiProductContainer } from "..";

class ProfileProductHistory extends React.Component {
	render() {
		return (
			<MultiProductContainer
				products={this.props.bought}
				showQtyBought={true}
				editAllowed={false}
			/>
		);
	}
}
export default ProfileProductHistory;
