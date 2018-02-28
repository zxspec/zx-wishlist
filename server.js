const express = require('express');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
const datalayer = require('./datalayer/datalayer');
const search = require('./datalayer/search');


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/wishlist/', (req, res, next) => {
  datalayer.fetchWishlist()
    .then(wishlist => res.json(wishlist))
    .catch(next);
});

app.post('/api/wishlist/add', (req, res, next) => {
  const wishlistItem = req.body;
  datalayer.addWishlistItem(wishlistItem)
     .then(result => res.json(result))
     .catch(next);
});

app.get('/api/search/', (req, res, next) => {
  const query = url.parse(req.url, true).query;
  const searchPhrase = query && query.q || '';
  search.search(searchPhrase)
    .then(results => res.json(results))
    .catch(next);
});

app.listen(port, () => {
  datalayer.initDB()
    .then(() => search.init(process.argv))
    .then(() => console.info(`Listening on port ${port}`));
});