import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductSearch from './containers/ProductSearch/ProductSearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
          <Route path="/" exact component={ProductSearch} />
          {/* <Route path="/wishlist" component={Wishlis} /> */}
          <Route render={() => <h1>404</h1>} />
      </Switch>
    );
  }
}

export default App;
