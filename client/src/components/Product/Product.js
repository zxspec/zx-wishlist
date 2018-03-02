import React, { Component } from 'react';
import axios from 'axios';

import './Product.css';

const defaultErrorMsg = "Something went wrong";

class Product extends Component {
    state = {
        isInWishlist: false,
        errorMessage: null
    }

    addToWishlistHandler = () => {
        console.info(this.props);        
        axios.post('/api/wishlist/add', this.props.product)
            .then(res => {
                if (res.data.url === this.props.product.url) {
                    this.setState({isInWishlist: true});
                } else {
                    throw new Error('Failed to add a product to wishlist');
                }
            })
            .catch(err => {
                this.setState({ errorMessage: err.errorMessage || defaultErrorMsg});
            });
    }

    render () {
        let errorBlock = null
        if (this.state.errorMessage) {
            errorBlock = (<p className="error">{this.state.errorMessage}</p>);
        }
        const product = this.props.product;
        return (
            <div className="product">
                <img src={product.image} alt={product.name}/>
                <a href={product.url}>
                    {product.name}                    
                </a>
                <strong className="price">price: {product.price}</strong>
                <button 
                    className="add-to-wishlist"
                    disabled={this.state.isInWishlist}
                    onClick={this.addToWishlistHandler}>Add To Wishlist</button>
                <button 
                    className="remove-from-wishlist"
                    onClick={this.props.remove}>Remove From Wishlist</button>
                {errorBlock}
            </div>
        );
    };
};

export default Product;