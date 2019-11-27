describe('Test Scenarios', function(){
    it('Scenario 1', function(){
        cy.visit('localhost:3000/admin')
		cy.url().should('include', '/login')
		
		cy.get('#spree_user_email').type('admin@example.com').should('have', 'example@gmail.com')
		cy.get('#spree_user_password').type('test123').should('have', 'test123')
		
		cy.get('.btn').click()
		
		cy.get('.flash').should('have.text', 'Logged in successfully')
		cy.url().should('include', '/admin/orders')
		
		cy.contains('Orders')
		cy.contains('Filter')
		
		cy.contains('Date Range')
		cy.contains('Orders')
		cy.contains('Status')
		cy.contains('Email')
		cy.contains('Promotion')
		cy.contains('First Name Begins With')
		cy.contains('Shipment Number')
		cy.contains('Last Name Begins With')
		cy.contains('Variant')
		
		cy.get('#q_number_start').type('R018933228')
		cy.get('div > .btn').click()
		cy.get('tbody > tr > :nth-child(2) > a').should('have.text', 'R018933228')
    })
})