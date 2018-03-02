import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Aux from './hoc/ReactAux';
import ProductSearch from './containers/ProductSearch/ProductSearch';
import Wishlist from './containers/Wishlist/Wishlist';
import Navigation from './components/Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <Aux>
        <Navigation />
        <Switch>
            <Route path="/" exact component={ProductSearch} />
            <Route path="/wishlist" component={Wishlist} />
            <Route render={() => <h1>404 Page Not Found</h1>} />
        </Switch>
      </Aux>
    );
  }
}

export default App;
