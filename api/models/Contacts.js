/**
 * Contacts.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  //model attributes
  attributes: {
    name: {type: 'string', required: true},
    image: {type: 'string'},
    phone: {type: 'string', required: true},
    //validate the format of the email
    email: {type: 'string', required: true, isEmail: true	},
  }
};

