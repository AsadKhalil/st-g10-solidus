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
		
		cy.get('#q_created_at_gt').click()
		cy.get('.open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="November 9, 2019"]').click()
		
		cy.wait(2000)
		
		cy.get('#q_created_at_lt').click()
		cy.get('.open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="November 1, 2019"]').click()
		
		cy.get('#q_created_at_gt').should('have.value', '2019-11-01')
		cy.get('#q_created_at_lt').should('have.value', '2019-11-09')
    
	
	
	
	
	})
})