/* eslint-env mocha */
describe('Wishlist Functionality', () => {
    before(() => {
        Cypress.config("baseUrl", "http://localhost:3000");
        cy.fixture('fakeProduct').as('fakeProduct');
    });

    describe('search box', () => {
        beforeEach(() => {
            cy.visit('/wishlist')
        });
        
        it('has display navigation', () => {
            cy.get('nav');
        });

        it('has to be available', () => {
            cy.get('.wishlist');
        });

        it('has to display products from wishlist', () => {
            cy.get('.wishlist .product');
        });

        context('wishlist product', () => {
            beforeEach(() => {
                cy.request('post', '/api/wishlist/add', '@fakeProduct');
            });

            it('should not display "add to wishlist" button', () => {
                cy.get('.wishlist .product:first').then($product => {
                    const $btn = $product.find('.add-to-wishlist');
                    if ($btn.length) {
                        expect($btn.css('display')).to.equal('none');
                    }
                });
            });

            it('should display "remove from wishlist" button', function () {
                cy.get('.wishlist .product:first').find('.remove-from-wishlist');
            });

            it('should be removed from a wishlist once the "remove from wishlist" button was clicked', () => {
                cy.server();
                cy.route('POST', '/api/wishlist/remove').as('wishlistItem');
                cy.get('.wishlist .product:first').find('.remove-from-wishlist').click();
                cy.wait('@wishlistItem').then(res => {
                    expect(res.status).to.equal(200);
                });
            });
        });
    });
})