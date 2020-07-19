import React from "react";
import { MultiProductContainer } from "..";

class ProfileSoldItems extends React.Component {
	render() {
		return (
			<MultiProductContainer
				products={this.props.products}
                showRemaining={false}
                showBuyers={true}
                editAllowed={false}
			/>
		);
	}
}

export default ProfileSoldItems;
