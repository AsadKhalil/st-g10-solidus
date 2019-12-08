describe('Test Scenarios', function()
{
    it('Scenario 1', function(){
        
       
//visiting admin portal
        var email =  'admin@example.com';
        var pw =  'test123';
        var SuccessMsg = 'Logged in successfully';
        var comp1 = 'Name';
        var comp2 = 'Usage Limit';
        var comp3 = 'Description';
        var comp4 = 'Promotion Code';
        var comp5 = 'Usage Limit must be greater than 0';
        var adminEmailComponent = '#spree_user_email';
		var adminPassComponent = '#spree_user_password';


//visiting admin portal
        cy.visit('/admin')
        cy.url().should('include', '/login')

//login authentification		
        cy.get(adminEmailComponent).type(email).should('have', email)
        cy.get(adminPassComponent).type(pw).should('have', pw)  

cy.get('.btn').click()
//after login it have to go to order directly(auto)		
        cy.get('.flash').should('have.text', SuccessMsg)
        cy.url().should('include', '/admin/orders')

//after clicking on promotions category
		cy.visit('localhost:3000/admin/promotions')
		cy.url().should('include', 'http://localhost:3000/admin/promotions')

		cy.contains('New Promotion').click

		cy.visit('localhost:3000/admin/promotions/new')
         cy.url().should('include','localhost:3000/admin/promotions/new')

        cy.contains(comp1)
        cy.contains(comp2)
		cy.contains(comp3)
		cy.contains(comp3)
		cy.contains(comp4)
		

        name="promotion[name]"

	    cy.get('input[name="promotion[name]"]').type('sale_on_haii')
		cy.get('input[name="promotion[usage_limit]"]').type('0')
		cy.get('input[name="single_code"]').type('23487')
		
	
		 cy.get("button[type='submit']").click()
		cy.get('.flash').should('have.text', comp5)
    })
})