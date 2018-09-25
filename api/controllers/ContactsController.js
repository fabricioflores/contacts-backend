

module.exports = {
  'create': (req, res) => {
    let contact = req.body;
    req.file('image').upload({
      adapter: require('skipper-s3'),
      key: sails.config.custom.s3Key,
      secret: sails.config.custom.s3Secret,
      bucket: sails.config.custom.s3Bucket
    }, (err, filesUploaded) => {
      if (err) {
        return res.serverError(err);
      }
      const file = filesUploaded[0];
      contact.image = file ? file.extra.Location : '';
      Contacts.create(contact, (error) => {
        if(error){
          res.status(422);
          res.send(error);
        }else{
          res.status(201);
          res.send(contact);
        }
      });
    });
  }
};
