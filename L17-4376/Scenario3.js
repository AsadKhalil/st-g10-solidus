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
		cy.visit('localhost:3000/admin/promotions')
		cy.url().should('include', 'http://localhost:3000/admin/promotions')

		cy.contains('New Promotion').click

		cy.visit('localhost:3000/admin/promotions/new')
         cy.url().should('include','localhost:3000/admin/promotions/new')

        cy.contains('Name')
        cy.contains('Usage Limit')
		cy.contains('Description')
		cy.contains('Description')
		cy.contains('Promotion Code')
		

        name="promotion[name]"

	    cy.get('input[name="promotion[name]"]').type('sale_on_haii')
		cy.get('input[name="promotion[usage_limit]"]').type('0')
		cy.get('input[name="single_code"]').type('23487')
		
	
		 cy.get("button[type='submit']").click()
		cy.get('.flash').should('have.text', 'Usage Limit must be greater than 0')
		
		

    })
})