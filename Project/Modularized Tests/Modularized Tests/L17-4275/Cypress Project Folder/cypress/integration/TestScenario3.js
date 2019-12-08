describe('Test Scenarios', function(){
    it('Scenario 1', function(){
        cy.visit('/admin')
		cy.url().should('include', '/login')

		var email =  'admin@example.com';
		var pw =  'test123';
		var comp1 = 'Orders';
		var comp2 = 'Filter';
		var comp3 = 'Date Range';
		var comp4 = 'Status';
		var comp5 = 'Email';
		var comp6 = 'Promotion';
		var comp7 = 'First Name Begins With';
		var comp8 = 'Shipment Number';
		var comp9 = 'Last Name Begins With';
		var comp10 = 'Variant';
		var orderID = 'R018933228';
		var SuccessMsg = 'Logged in successfully';
		var newName = 'Test123';
		var adminEmailComponent = '#spree_user_email';
		var adminPassComponent = '#spree_user_password';

        cy.visit('/admin')
		cy.url().should('include', '/login')

		cy.get(adminEmailComponent).type(email).should('have', email)
		cy.get(adminPassComponent).type(pw).should('have', pw)
		
		cy.get('.btn').click()
		
		cy.get('.flash').should('have.text', SuccessMsg)
		cy.url().should('include', '/admin/orders')
		
		cy.contains(comp1)
		cy.contains(comp2)
		cy.contains(comp3)
		cy.contains(comp4)
		cy.contains(comp5)
		cy.contains(comp6)
		cy.contains(comp7)
		cy.contains(comp8)
		cy.contains(comp9)
		cy.contains(comp10)

		cy.wait(10000)
		
		cy.get('.actions > .fa').click()
		cy.url().should('include', '/edit')
		
		cy.get('[data-hook="admin_order_tabs_customer_details"] > a').click()
		cy.url().should('include', '/customer/edit')
		
		cy.get('#order_bill_address_attributes_firstname').clear()
		cy.get('#order_bill_address_attributes_firstname').type(newName)
		
		cy.get('.btn').click()
		
		cy.get('.flash').should('have.text', 'Customer Details Updated')
		
		cy.get('.breadcrumb > :nth-child(1) > a').click()
		cy.url().should('include', '/orders')
		
		cy.get('#q_bill_address_firstname_start').type(newName)
		cy.get('div > .btn').click()
		
		cy.get('tbody > tr > :nth-child(2) > a').should('have.text', orderID)
		
    })
})