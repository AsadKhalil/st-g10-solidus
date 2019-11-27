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
		cy.wait(10000)
		cy.get('.actions > .fa').click()
		cy.url().should('include', '/edit')
		
		cy.get('[data-hook="admin_order_tabs_customer_details"] > a').click()
		cy.url().should('include', '/customer/edit')
		
		cy.get('#order_bill_address_attributes_firstname').clear()
		cy.get('#order_bill_address_attributes_firstname').type('Test123')
		
		cy.get('.btn').click()
		
		cy.get('.flash').should('have.text', 'Customer Details Updated')
		
		cy.get('.breadcrumb > :nth-child(1) > a').click()
		cy.url().should('include', '/orders')
		
		cy.get('#q_bill_address_firstname_start').type('Test123')
		cy.get('div > .btn').click()
		
		cy.get('tbody > tr > :nth-child(2) > a').should('have.text', 'R018933228')
		
		
		
		
		
		
		
    })
})