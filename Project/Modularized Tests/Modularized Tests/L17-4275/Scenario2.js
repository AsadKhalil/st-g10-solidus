describe('Test Scenarios', function(){
    it('Scenario 3', function(){
        
        var email =  'admin@example.com';
        var pw =  'test123';
        var adminEmailComponent = '#spree_user_email';
        var adminPassComponent = '#spree_user_password';
        var SuccessMsg = 'Logged in successfully';
        var comp1 = 'New Product';
		var comp2 = 'SKU';
		var comp3 = 'Name';
        var comp4 = 'Master Price';
        var comp5 = 'Name';
        var comp6 = 'Presentation';

        cy.visit('/admin')
		cy.url().should('include', '/login')
		
		cy.get(adminEmailComponent).type(email).should('have', email)
		cy.get(adminPassComponent).type(pw).should('have', pw)
		
		cy.get('.btn').click()
		
		cy.get('.flash').should('have.text', SuccessMsg)
		cy.url().should('include', '/admin/orders')
		cy.visit('localhost:3000/admin/products')
		cy.url().should('include', 'http://localhost:3000/admin/products')
		cy.contains('Orders')
		cy.contains('Search')
		
		cy.contains(comp1)
		cy.contains(comp2)
		cy.contains(comp3)
		cy.contains(comp4)


		cy.visit('http://localhost:3000/admin/option_types')
		cy.url().should('include', 'http://localhost:3000/admin/option_types')
		cy.contains(comp5)
		cy.contains(comp6)
	
		cy.get('a[href="http://localhost:3000/admin/option_types/new"]').click()
		cy.visit('http://localhost:3000/admin/option_types/new')
		cy.url().should('include', 'http://localhost:3000/admin/option_types/new')

		cy.contains(comp5)
		cy.contains(comp6)
		cy.get('input[name="option_type[name]"]').type('Name 1')
		 cy.get('input[name="option_type[presentation]"]').type('abc')
		  cy.get("button[type='submit']").click()
		 cy.get('.flash').should('have.text', 'Option Type has been successfully created!')

		
    })
})