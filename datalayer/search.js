const axios = require('axios');
const rp = require('request-promise');
let mockSearchRequest;

const fakeSearchResult = {
    "suggestions": [],
    "suggestionsGroups": [],
    "categories": [],
    "products": [
      {
        "suggestion": "ZX Flux Shoes",
        "image": "https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1519690630395/zoom/S32279_01_standard.jpg?sw=60&sh=60&sm=fit",
        "url": "http://www.adidas.co.uk/zx-flux-shoes/S32279.html",
        "rating": "5",
        "reviews": "3388",
        "subTitle": "Originals",
        "isPreorder": "",
        "salePrice": null,
        "standardPrice": 69.95
      },
      {
        "suggestion": "ZX Flux Shoes",
        "image": "https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1519690630395/zoom/S32277_01_standard.jpg?sw=60&sh=60&sm=fit",
        "url": "http://www.adidas.co.uk/zx-flux-shoes/S32277.html",
        "rating": "5",
        "reviews": "3388",
        "subTitle": "Originals",
        "isPreorder": "",
        "salePrice": null,
        "standardPrice": 69.95
      },
      {
        "suggestion": "ZX Flux Shoes",
        "image": "https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1519690630395/zoom/M19840_01_standard.jpg?sw=60&sh=60&sm=fit",
        "url": "http://www.adidas.co.uk/zx-flux-shoes/M19840.html",
        "rating": "5",
        "reviews": "3388",
        "subTitle": "Originals",
        "isPreorder": "",
        "salePrice": null,
        "standardPrice": 69.95
      },
      {
        "suggestion": "ZX Flux Shoes",
        "image": "https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1519690630395/zoom/M19841_01_standard.jpg?sw=60&sh=60&sm=fit",
        "url": "http://www.adidas.co.uk/zx-flux-shoes/M19841.html",
        "rating": "5",
        "reviews": "3388",
        "subTitle": "Originals",
        "isPreorder": "",
        "salePrice": null,
        "standardPrice": 69.95
      }
    ]
  };

const fakeSearchEmptyResult = {"suggestions":[],"suggestionsGroups":[],"categories":[],"products":[]};

function init (cliArgs) {
    console.info('### search init ###');
    console.info('### search init, cliArgs: ', cliArgs);

    if (cliArgs) {
        mockSearchRequest = cliArgs.indexOf('--mockSearchRequests') > -1;
    }
    
    console.info('### mockSearchRequest: ', mockSearchRequest);

    return Promise.resolve(true);
}

function search (searchPhrase) {
    let result;
    console.info('### search()');
    console.info('### search phrase: ', searchPhrase);
    if (mockSearchRequest) {
        if (!searchPhrase || searchPhrase === 'NON_EXISTING_PRODUCT') {
            result = Promise.resolve(fakeSearchEmptyResult);
        } else {
            result =Promise.resolve(fakeSearchResult);
        }
    } else {
        result = rp(`https://www.adidas.co.uk/api/suggestions/${searchPhrase}`)
            .then(payload => JSON.parse(payload))
    }

    result = result.then(fullSearchResults => fullSearchResults.products)
        .then(products => products.map(product => {
            return {
                url: product.url,
                image: product.image,
                name: product.suggestion,
                price: product.salePrice || product.standardPrice
            }}));

    return result;
}

module.exports = {
    init: init,
    search: search
};