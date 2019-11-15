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
//after login it have to go to order directly(auto)		
		cy.get('.flash').should('have.text', 'Logged in successfully')
		cy.url().should('include', '/admin/orders')

//after clicking on promotions category
		cy.visit('localhost:3000/admin/promotion_categories')
		cy.url().should('include', 'http://localhost:3000/admin/promotion_categories')
//it should include following words		
		cy.contains('Name')
		cy.contains('Code')

		cy.contains('New Promotion Category').click

		cy.visit('localhost:3000/admin/promotion_categories/new')
         cy.url().should('include','localhost:3000/admin/promotion_categories/new')

        cy.contains('Name')
		cy.contains('Code')

	    cy.get('input[name="promotion_category[name]"]').type('new')
		cy.get('input[name="promotion_category[code]"]').type('0909')
		
		cy.get("button[type='submit']").click()
		
		
		cy.get('.flash').should('have.text', 'Promotion Category "new" has been successfully created!')
		
		

    })
})