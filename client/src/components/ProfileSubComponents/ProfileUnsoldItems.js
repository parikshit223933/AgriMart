import React from "react";
import { MultiProductContainer } from "..";

class ProfileUnsoldItems extends React.Component {
	render() {
		return (
			<MultiProductContainer
				products={this.props.products}
				showRemaining={true}
				showBuyers={false}
				editAllowed={true}
			/>
		);
	}
}
export default ProfileUnsoldItems;
