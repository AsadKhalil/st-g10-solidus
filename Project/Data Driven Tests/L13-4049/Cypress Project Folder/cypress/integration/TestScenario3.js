describe('Test Scenarios', function(){
    it('Scenario 1', function(){

        cy.visit('/admin')
		cy.url().should('include', '/login')

		cy.fixture('data').as('data');
		cy.get('@data').then((testData) => {
			cy.get(testData.adminEmailComponent).type(testData.email).should('have', testData.email)
			cy.get(testData.adminPassComponent).type(testData.pw).should('have', testData.pw)
			cy.get('.btn').click()
		
			cy.get('.flash').should('have.text', 'Logged in successfully')
			cy.url().should('include', '/admin/orders')
			cy.contains(testData.comp1)
			cy.contains(testData.comp2)
			cy.contains(testData.comp3)
			cy.contains(testData.comp4)
			cy.contains(testData.comp5)
			cy.contains(testData.comp6)
			cy.contains(testData.comp7)
			cy.contains(testData.comp8)
			cy.contains(testData.comp9)
			cy.contains(testData.comp10)

			cy.wait(10000)
		
			cy.get('.actions > .fa').click()
			cy.url().should('include', '/edit')
			
			cy.get('[data-hook="admin_order_tabs_customer_details"] > a').click()
			cy.url().should('include', '/customer/edit')
			
			cy.get('#order_bill_address_attributes_firstname').clear()
			cy.get('#order_bill_address_attributes_firstname').type(testData.newName)
			
			cy.get('.btn').click()
			
			cy.get('.flash').should('have.text', 'Customer Details Updated')
			
			cy.get('.breadcrumb > :nth-child(1) > a').click()
			cy.url().should('include', '/orders')
			
			cy.get('#q_bill_address_firstname_start').type(testData.newName)
			cy.get('div > .btn').click()
			
			cy.get('tbody > tr > :nth-child(2) > a').should('have.text', testData.orderID)
		})		
    })
})