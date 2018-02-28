import React, { Component } from 'react';
import Product from '../../components/Product/Product';
import axios from 'axios';

class ProductSearch extends Component {
    state = {
        products: [],        
        typingTimer: null
    }

    findProducts = (searchPhrase) => {
        if (this.state.typingTimer) {
            clearTimeout(this.state.typingTimer);
        }
        const timerID = setTimeout(() => {
            axios.get(`/api/search/?q=${searchPhrase}`)
                .then(res => {
                    console.info('### product: ', res.data);
                    this.setState({
                        products: res.data,
                        typingTimer: null
                    });
                });
        }, 300);
        this.setState({typingTimer: timerID});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.typingTimer;        
    }

    render () {
        let searchResults = (<h2 className="noSearchResult">No Results</h2>);
        
        if (this.state.products && this.state.products.length) {
            const products = this.state.products.map((product, idx) => {
                return <Product key={idx} product={product}/>;
            });
            searchResults = (<div className="searchResult">{products}</div>);
        }
        return (
            <section className="productSearchBox">
                <input type="text"
                    className="productSearch"
                    onChange={this.findProducts} />
                {searchResults}
            </section>
        );
    }
}

export default ProductSearch;