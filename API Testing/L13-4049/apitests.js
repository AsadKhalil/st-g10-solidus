  
const should = require("should");
const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:3000";
const util = require("util");

describe('Check Status', function() {
    it('Checks Online Status', function(done) {
        request.get({ url: baseUrl + '/' },
            function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                done();
            });
    });
});