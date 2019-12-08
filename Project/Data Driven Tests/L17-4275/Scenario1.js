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
			cy.visit('localhost:3000/admin/products')
			cy.url().should('include', 'http://localhost:3000/admin/products')

			cy.contains(testData.comp1)
			cy.contains(testData.comp2)
			cy.contains(testData.comp3)
			cy.contains(testData.comp4)
			cy.contains(testData.comp5)
			cy.contains(testData.comp6)


		cy.get('input[name="q[name_cont]"]').type(testData.ProductName)
		cy.get('input[name="q[with_variant_sku_cont]"]').type(testData.ProductId)
		
		cy.get("button[type='submit']").click()
		cy.contains(testData.ProductName)
		cy.contains(testData.ProductId)
		
		})		

    })
})//*[@id="q_variant_sku_cont"]