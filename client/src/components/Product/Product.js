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
        const url = `/api/wishlist/add`;
        axios.post(url, this.props.product)
            .then(res => {
                if (res.data.url === this.props.product.url) {
                    this.setState({isInWishlist: true});
                } else {
                    throw new Error('Failed to add product to wishlist');
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
        return (
            <div className="product">
                <a href={this.props.product.url}>
                    {this.props.product.name}
                    <img src={this.props.product.image} />
                </a>
                <strong className="price">price: {this.props.product.price}</strong>
                <button 
                    className="add-to-wishlist"
                    disabled={this.state.isInWishlist}
                    onClick={this.addToWishlistHandler}>Add To Wishlist</button>                
                {errorBlock}
            </div>
        );
    };
};

export default Product;