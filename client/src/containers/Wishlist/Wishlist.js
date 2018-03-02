import React, { Component } from 'react';
import axios from 'axios';
import Product from '../../components/Product/Product';

import './Wishlist.css';

const defaultErrorMsg = "Something went wrong";

class Wishlist extends Component{
    state = {        
        products: [],
        errorMessage: null
    }

    componentDidMount = () => {
        axios.get('/api/wishlist')
        .then(res => {
            const products = res.data;
            this.setState({products});
        })
        .catch(e => {
            console.error(e);
        })
    }

    removeFromWishlistHandler = (id) => {
        console.info(this.props);        
        axios.post('/api/wishlist/remove', { url: id })
            .then(res => {
                if (res.data.result === 'OK') {
                    const newProducts = [...this.state.products].filter(p => p.url !== id);
                    this.setState({products: newProducts});
                } else {
                    throw new Error('Failed to remove a product to wishlist');
                }
            })
            .catch(err => {
                this.setState({ errorMessage: err.errorMessage || defaultErrorMsg});
            });
    }
    
    render ()  {
        let products;
        let header = <span className="no-wishlist-items">No items in wishlist </span>
        if (this.state.products && this.state.products.length) {
            header = <h2>Wishlist items:</h2>;
            products = this.state.products.map( (product, idx) => 
                <Product key={idx} product={product} remove={() => this.removeFromWishlistHandler(product.url)}/>
            );
        }

        let errorBlock = null
        if (this.state.errorMessage) {
            errorBlock = (<p className="error">{this.state.errorMessage}</p>);
        }        

        return (
            <section className="wishlist">
                {errorBlock}
                {header}
                {products}
            </section>
        );
    }
}

export default Wishlist;