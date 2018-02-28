/* eslint-env mocha */
describe('Wishlist API', () => {
    before(() => {
        Cypress.config("baseUrl", "http://localhost:5000");
    });
    
    describe('wishlist items', () => {
        it('has to be in a json format', function () {
            cy.request('/api/wishlist')
                .its('headers')
                    .its('content-type')
                    .should('include', 'application/json')        
        });

        it('has to be an array of products', function () {
            cy.request('/api/wishlist').then( res => {
                expect(res.body).to.be.an('array');                
                expect(res.body.length).to.be.greaterThan(0);
            });
        });
        
        describe('wishlist product', () => {
            it('has to be an object', function () {
                cy.request('/api/wishlist').then( res => {
                    const product = res.body[0];
                    expect(product).to.be.an('object');
                });
            });
            it('has to contain product page url', function () {
                cy.request('/api/wishlist').then( res => {
                    const product = res.body[0];
                    expect(product.url).to.be.a('string');
                });
            });
            it('has to contain product image', function () {
                cy.request('/api/wishlist').then( res => {
                    const product = res.body[0];
                    expect(product.image).to.be.a('string');
                });
            });
            it('has to contain product name', function () {
                cy.request('/api/wishlist').then( res => {
                    const product = res.body[0];
                    expect(product.name).to.be.a('string');
                });
            });
            it('has to contain product price', function () {
                cy.request('/api/wishlist').then( res => {
                    const product = res.body[0];
                    expect(product.price).to.be.a('number');
                });
            });
        });
    });

    describe('add wishlist item', () => {
        const fakeProduct =     {
            url: 'http://www.adidas.co.uk/stan-smith-shoes/M20325.html',
            image: 'https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1519517066528/zoom/M20325_01_standard.jpg?sw=60&sh=60&sm=fit',
            name: 'Stan Smith Shoes',
            price: 69.95
        };

        it('should respond in JSON format', function () {
            cy.request('post', '/api/wishlist/add', fakeProduct)
                .its('headers')
                    .its('content-type')
                    .should('include', 'application/json')        
        });

        it('should return object containing url of the added product', function () {
            cy.request('post', '/api/wishlist/add', fakeProduct)
                .then( res => {
                    const addProductResult = res.body;
                    expect(addProductResult.url).to.equal(fakeProduct.url);
                });
        });
    });
})