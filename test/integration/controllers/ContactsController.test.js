var supertest = require('supertest');
var assert = require('assert');

describe('ContactsController.login', () => {

  describe('#index', () => {
    it('should return an empty array of contacts', (done) => {
      supertest(sails.hooks.http.app)
      .get('/contacts')
      .expect(200, [], done);
    });
  });

  describe('#create', () => {
    it('should return a new contact', (done) => {
      supertest(sails.hooks.http.app)
      .post('/contacts')
      .send({name: 'fabricio', phone:'592123123', email: 'fabri@fabri.com'})
      .expect(201)
      .then(response => {
        assert(response.body.email, 'fabri@fabri.com');
        done();
      });
    });

    it('should return an error creating contact', (done) => {
      supertest(sails.hooks.http.app)
      .post('/contacts')
      .send({name: 'fabricio', phone:'592123123'})
      .expect(422)
      .then(response => {
        assert(response.body.code, 'E_INVALID_NEW_RECORD');
        assert(response.body.details, 'Missing value for required attribute `email`.  Expected a string, but instead, got: undefined');
        done();
      });
    });

    it('should return 1 contact', (done) => {
      supertest(sails.hooks.http.app)
      .get('/contacts')
      .expect(200)
      .then(response => {
        assert(response.body[0].email, 'fabri@fabri.com');
        done();
      });
    });
  });

});
