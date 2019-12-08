describe('Test Scenarios', function()
{
    it('Scenario 1', function(){

        var email =  'admin@example.com';
        var pw =  'test123';
        var SuccessMsg = 'Logged in successfully';
        var comp1 = 'Name';
        var comp2 = 'Code';
        var comp3 = 'New Promotion Category';
        var comp4 = 'Promotion Category "new" has been successfully created!';
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
		cy.visit('localhost:3000/admin/promotion_categories')
		cy.url().should('include', 'http://localhost:3000/admin/promotion_categories')
//it should include following words		
        cy.contains(comp1)
        cy.contains(comp2)

		cy.contains(comp3).click

		cy.visit('localhost:3000/admin/promotion_categories/new')
         cy.url().should('include','localhost:3000/admin/promotion_categories/new')

         cy.contains(comp1)
         cy.contains(comp2)

	    cy.get('input[name="promotion_category[name]"]').type('new')
		cy.get('input[name="promotion_category[code]"]').type('0909')
		
		cy.get("button[type='submit']").click()
		
		
		cy.get('.flash').should('have.text', comp4)
		
		

    })
})