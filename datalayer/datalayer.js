let db;
const dirty = require('dirty');
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

function initInMemoryDB () {
    console.info('### init DB');
    db = dirty();

    db.on('drain', () => {
        console.warn('All records are saved on disk now.')
    }); // this should never happen
    
    return new Promise((resolve, reject) => {
        db.on('load', function() {
            db.set(fakeWishList[0].url, fakeWishList[0]);
            db.set(fakeWishList[1].url, fakeWishList[1]);
            resolve(db);
        });        
    });
}

function fetchWishlist () {
    console.info('### fetchWishlist()');
    const result =[];
    
    db.forEach((key, val) => {
        console.info(key);
        result.push(val);
    });

    return Promise.resolve(result);
}

module.exports = {
    initDB: initInMemoryDB,
    fetchWishlist: fetchWishlist
};