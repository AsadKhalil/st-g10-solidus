describe('Test Scenarios', function()
{
    it('Scenario 1', function(){
        
       
//visiting admin portal
        cy.visit('localhost:3000/admin')
		cy.url().should('include', '/login')
		
//login authentification		
		cy.get('#spree_user_email').type('admin@example.com').should('have', 'example@gmail.com')
		cy.get('#spree_user_password').type('test123').should('have', 'test123')
		
		cy.get('.btn').click()
//after login it have to go to order directly		
		cy.get('.flash').should('have.text', 'Logged in successfully')
		cy.url().should('include', '/admin/orders')

//after clicking on promotions
		cy.visit('localhost:3000/admin/promotions')
		cy.url().should('include', 'http://localhost:3000/admin/promotions')
//it should include following words		
		cy.contains('Name')
		cy.contains('Code')
		cy.contains('Path')
		cy.contains('Promotion Category')
	

		
		cy.get('input[name="q[name_cont]"]').type('jawad')
		cy.get('input[name="q[codes_value_cont]"]').type('1122')
		

		cy.get("button[type='submit']").click()
		
		cy.contains('Status')
	
    })
})