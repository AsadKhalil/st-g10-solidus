describe('Test Scenarios', function(){
    it('Scenario 2', function(){
        
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
        var comp7 = 'New Product';
        var comp8 = 'Slug';
        var comp9 = 'Name';
        var comp10 = 'Master Price';
        var comp11 = 'Description';
        var comp12 = 'Product Name 1';
        var comp13 = 'Product "Product Name 1" has been successfully created!';

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

		cy.get('a[href="http://localhost:3000/admin/products/new"]').click()
		cy.visit('http://localhost:3000/admin/products/new')
		cy.url().should('include', 'http://localhost:3000/admin/products/new')
		cy.contains(comp7)
		cy.contains(comp8)
		cy.contains(comp9)
		cy.contains(comp10)
		cy.contains(comp11)

		 cy.get('input[name="product[name]"]').type(comp12)
		 cy.get('input[name="product[price]"]').type('100')

			cy.get('#product_shipping_category_id')
 		 .select('1')
		 cy.get("button[type='submit']").click()
		 cy.get('.flash').should('have.text', comp13)

		
    })
})