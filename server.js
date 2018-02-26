const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const datalayer = require('./datalayer/datalayer');

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/wishlist/', (req, res, next) => {
  datalayer.fetchWishlist()
    .then(wishlist => res.json(wishlist))
    .catch(next);
});

app.listen(port, () => {
  datalayer.initDB()
    .then(db => {
      console.log(`Listening on port ${port}`);
    });
});