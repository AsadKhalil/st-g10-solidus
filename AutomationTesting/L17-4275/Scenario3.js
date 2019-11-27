describe('Test Scenarios', function(){
    it('Scenario 2', function(){
        cy.visit('localhost:3000/admin')
		cy.url().should('include', '/login')
		
		cy.get('#spree_user_email').type('admin@example.com').should('have', 'example@gmail.com')
		cy.get('#spree_user_password').type('test123').should('have', 'test123')
		
		cy.get('.btn').click()
		
		cy.get('.flash').should('have.text', 'Logged in successfully')
		cy.url().should('include', '/admin/orders')
		cy.visit('localhost:3000/admin/products')
		cy.url().should('include', 'http://localhost:3000/admin/products')
		cy.contains('Orders')
		cy.contains('Search')
		
		cy.contains('New Product')
		cy.contains('SKU')
		cy.contains('Name')
		cy.contains('Master Price')

		cy.get('a[href="http://localhost:3000/admin/products/new"]').click()
		cy.visit('http://localhost:3000/admin/products/new')
		cy.url().should('include', 'http://localhost:3000/admin/products/new')
		cy.contains('New Product')
		cy.contains('Slug')
		cy.contains('Name')
		cy.contains('Master Price')
		cy.contains('Description')

		 cy.get('input[name="product[name]"]').type('Product Name 1')
		 cy.get('input[name="product[price]"]').type('100')

			cy.get('#product_shipping_category_id')
 		 .select('1')
		 cy.get("button[type='submit']").click()
		 cy.get('.flash').should('have.text', 'Product "Product Name 1" has been successfully created!')

		
    })
})
