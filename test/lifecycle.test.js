var sails = require('sails');

before(function(done){

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },

  }, (err) => {
    if (err) { return done(err); }
    return done();
  });
});

after((done) => {
  sails.lower(done);

});
