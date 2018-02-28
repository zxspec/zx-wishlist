/* eslint-env mocha */
describe('Product Search Functionality', () => {
    before(() => {
        Cypress.config("baseUrl", "http://localhost:3000");
    });

    describe('search box', () => {
        it('has to be available', function () {
            cy.visit('/');
            cy.get('.productSearchBox:first');
        });

        context('searching for non existing product', () => {
            it('has to show "No Result" message', function () {
                cy.visit('/');
                cy.get('.productSearch:first').type('{selectall}').type('NON_EXISTING_PRODUCT');
                cy.get('.noSearchResult').contains('No Results');
            });
        });
        
        context('searching for existing product', () => {
            it('has to show found products', function () {
                cy.visit('/');
                cy.get('.productSearch:first').type('{selectall}').type('stan');
                cy.get('.searchResult');
            });
            
            describe('product', () => {
                before(() => {
                    cy.visit('/');                    
                });

                beforeEach(() => {                    
                    cy.get('.productSearch:first').type('{selectall}').type('stan');
                    cy.get('.searchResult').find('.product').first().as('product');
                });

                it('should have a link to a PDP', () => {                    
                    cy.get('@product').children('a').then(link => {
                        const title = link.text();
                        expect(title).to.be.a('string');
                        expect(title.length).to.be.greaterThan(0);
                    });
                });

                it('should have a preview image', () => {                    
                    cy.get('@product').find('a img');
                });

                it('should have a price', () => {                    
                    cy.get('@product').find('.price').contains('price');
                });

                it('should have a button to add to wishlist', () => {                    
                    cy.get('@product').find('.add-to-wishlist');
                });

                it('should be added to a wishlist once the "add to wishlist" button was clicked', () => {
                    cy.server();
                    cy.route('POST', '/api/wishlist/add').as('addWishlistItem');
                    cy.get('@product').find('.add-to-wishlist').click();
                    cy.wait('@addWishlistItem').then(res => {
                        expect(res.status).to.equal(200);
                    });
                });
            });
        });
    });
})