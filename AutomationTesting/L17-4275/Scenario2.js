describe('Test Scenarios', function(){
    it('Scenario 3', function(){
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


		cy.visit('http://localhost:3000/admin/option_types')
		cy.url().should('include', 'http://localhost:3000/admin/option_types')
		cy.contains('Name')
		cy.contains('Presentation')
	
		cy.get('a[href="http://localhost:3000/admin/option_types/new"]').click()
		cy.visit('http://localhost:3000/admin/option_types/new')
		cy.url().should('include', 'http://localhost:3000/admin/option_types/new')

		cy.contains('Name')
		cy.contains('Presentation')
		cy.get('input[name="option_type[name]"]').type('Name 1')
		 cy.get('input[name="option_type[presentation]"]').type('abc')
		  cy.get("button[type='submit']").click()
		 cy.get('.flash').should('have.text', 'Option Type has been successfully created!')

		
    })
})
