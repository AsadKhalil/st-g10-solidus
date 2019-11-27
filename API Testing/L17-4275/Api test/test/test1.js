const myasserts = require('chai').assert
let request = require('supertest');
const data = require('../utils/data');

const base_url = "http://localhost:3000/admin";
const api_key = "634f31d3a4ebf21a4cd72a28e16b50aae8db624ff00bbf91";
request = request(base_url);
describe('Solidus',function()
{
    it('First Test', function(done) 
    {  //get products on product page
        request
        .get('/products?per_page=25&page=1')

        .expect(302)

        .then(response => {
            console.log(response.body);
                done();
            })
    })
    it('Second Test', function(done) 
    {   //get product by id   
            request
        .post('/products/new')
        .query({
            "name": "p1",
            "description": "some des",
            "available_on": "",
            "permalink": "",
            "meta_description": "",
            "meta_keywords": "",
            "price": "",
            "sku": "",
            "deleted_at": "string",
            "option_values_hash": {},
            "weight": "string",
            "height": "string",
            "width": "string",
            "depth": "string",
            "shipping_category_id": 123,
            "tax_category_id": 123,
            "taxon_ids": [
              123
            ],
            "option_type_ids": [
              123
            ],
            "cost_currency": "string",
            "cost_price": "string",
            "product_properties_attributes": [
              {
                "property_name": "string",
                "value": "string",
                "position": 123
              }
            ]
        })

        .expect(404)

        .then(response => {
            console.log(response.body);
                done();
            })
        
    })
});