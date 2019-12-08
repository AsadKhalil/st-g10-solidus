describe('Test Scenarios', function(){
    it('Scenario 1', function(){

		cy.visit('/admin')
		cy.url().should('include', '/login')

		cy.fixture('data').as('data');
		cy.get('@data').then((testData) => 
		{
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
			cy.get('#q_number_start').type(testData.orderID)
			cy.get('div > .btn').click()
			cy.get('tbody > tr > :nth-child(2) > a').should('have.text', testData.orderID)
		
		})
    })
})