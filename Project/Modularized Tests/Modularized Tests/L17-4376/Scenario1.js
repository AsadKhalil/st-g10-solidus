describe('Test Scenarios', function()
{
    it('Scenario 1', function(){

        var email =  'admin@example.com';
		var pw =  'test123';
        var SuccessMsg = 'Logged in successfully';
        var comp1 = 'Name';
		var comp2 = 'Code';
		var comp3 = 'Path';
		var comp4 = 'Promotion Category';
		var adminEmailComponent = '#spree_user_email';
		var adminPassComponent = '#spree_user_password';
       
//visiting admin portal
        cy.visit('/admin')
        cy.url().should('include', '/login')
		
//login authentification		
cy.get(adminEmailComponent).type(email).should('have', email)
cy.get(adminPassComponent).type(pw).should('have', pw)
		
		cy.get('.btn').click()
//after login it have to go to order directly		
        cy.get('.flash').should('have.text', SuccessMsg)
		cy.url().should('include', '/admin/orders')

//after clicking on promotions
		cy.visit('localhost:3000/admin/promotions')
		cy.url().should('include', 'http://localhost:3000/admin/promotions')
//it should include following words		
		cy.contains(comp1)
		cy.contains(comp2)
		cy.contains(comp3)
		cy.contains(comp4)
	

		
		cy.get('input[name="q[name_cont]"]').type('jawad')
		cy.get('input[name="q[codes_value_cont]"]').type('1122')
		

		cy.get("button[type='submit']").click()
		
		cy.contains('Status')
	
    })
})