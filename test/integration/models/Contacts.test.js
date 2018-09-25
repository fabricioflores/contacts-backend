var assert = require('assert');

describe('User (model)', () => {

  describe('#validations',() => {
    it('should validate presence of name', (done) => {
      Contacts.create({email:'fabri@fabri.com', phone:'123123123'}).then( () => {
        console.log('won`t never enter here');
      }, (error) => {
        assert(error.name, 'Usage error');
        assert(error.code, 'E_INVALID_NEW_RECORD');
        done();
      });
    });

    it('should validate the mail', (done) => {
      Contacts.create({name: 'Fabricio', email:'fabri', phone:'123123123'}).then( () => {
        console.log('won`t never enter here');
      }, (error) => {
        assert(error.name, 'Usage error');
        assert(error.code, 'E_INVALID_NEW_RECORD');
        done();
      });
    });

    it('should save a valid contact', (done) => {
      const contact = {name: 'Fabricio', email:'fabri@fabri.com', phone:'123123123'};
      Contacts.create(contact).then( () => {
        assert(contact.id);
        done();
      });
    });
  });

});
