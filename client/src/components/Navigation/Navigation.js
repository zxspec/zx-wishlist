import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const navigation = (props) => {
    return (
        <nav>
            <NavLink to="/" exact>Search</NavLink>
            <NavLink to="/wishlist">Wishlist</NavLink>
        </nav>
    );
}

export default navigation;