import React from 'react';
import { MultiProductContainer } from '..';

class ProfileSoldItems extends React.Component
{
    render()
    {
        return<MultiProductContainer products={this.props.products}/>
    }
}

export default ProfileSoldItems;