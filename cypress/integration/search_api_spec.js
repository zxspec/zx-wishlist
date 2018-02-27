/* eslint-env mocha */
describe('Product Search API', () => {
    before(() => {
        Cypress.config("baseUrl", "http://localhost:5000");
    });
    
    describe('product search results', () => {
        it('has to be in a json format', function () {
            cy.request('/api/search?q=stan')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json')        
        });    
        
        context('no products found', () => {
            it('has to return empty array', function () {
                cy.request('/api/search?q=NON_EXISTING_PRODUCT').then(res => {
                    const products = res.body;
                    expect(products).to.be.an('array');
                    expect(products.length).to.equal(0);                    
                });
            });
        });

        context('products found', () => {
            it('has to return non-empty array', function () {
                cy.request('/api/search?q=stan').then(res => {
                    const products = res.body;
                    expect(products).to.be.an('array');
                    expect(products.length).to.be.greaterThan(0);                    
                });
            });

            describe('product', () => {
                it('has to contain product page url', function () {
                    cy.request('/api/search?q=stan').then(res => {
                        const products = res.body;
                        const product = products[0];
                        expect(product.url).to.be.a('string');
                    });
                });
                it('has to contain product image', function () {
                    cy.request('/api/wishlist').then( res => {
                        const products = res.body;
                        const product = products[0];
                        expect(product.image).to.be.a('string');
                    });
                });
                it('has to contain product name', function () {
                    cy.request('/api/wishlist').then( res => {
                        const products = res.body;
                        const product = products[0];
                        expect(product.name).to.be.a('string');
                    });
                });
                it('has to contain product price', function () {
                    cy.request('/api/wishlist').then( res => {
                        const products = res.body;
                        const product = products[0];
                        expect(product.price).to.be.a('number');
                    });
                });
            });
        });
    });
})
