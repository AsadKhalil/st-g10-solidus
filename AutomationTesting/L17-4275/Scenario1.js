describe('Test Scenarios', function(){
    it('Scenario 1', function(){
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

		cy.get('input[name="q[name_cont]"]').type('Ruby Hoodie')
		cy.get('input[name="q[with_variant_sku_cont]"]').type('RUB-HD01')
		
		cy.get("button[type='submit']").click()
		cy.contains('Ruby Hoodie')
		cy.contains('RUB-HD01')
		
    })
})//*[@id="q_variant_sku_cont"]