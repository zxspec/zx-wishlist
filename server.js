const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/wishlist/', (req, res) => {
  const wishlist = fetchWishlist();
  res.json(wishlist);
})

app.listen(port, () => console.log(`Listening on port ${port}`));

function fetchWishlist () {
  const fakeWishList = [    
    {
      url: 'http://www.adidas.co.uk/pharrell-williams-hu-holi-stan-smith-bc-shoes/DA9611.html',
      image: 'https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1519517066528/zoom/DA9611_01_standard.jpg?sw=60&sh=60&sm=fit',
      name: 'Pharrell Williams Hu Holi Stan Smith BC Shoes',
      price: 99.95
    }, 
    {
      url: 'http://www.adidas.co.uk/stan-smith-shoes/M20325.html',
      image: 'https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1519517066528/zoom/M20325_01_standard.jpg?sw=60&sh=60&sm=fit',
      name: 'Stan Smith Shoes',
      price: 69.95
    }
  ];
  return fakeWishList;
}
