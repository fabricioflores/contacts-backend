

module.exports = {
  'create': (req, res) => {
    var contact = req.body;
    req.file('image').upload({
      adapter: require('skipper-s3'),
      key: 'AKIAIPW4LY24ZPHIUZNA',
      secret: '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',
      bucket: 'fabricioflores'
    }, (err, filesUploaded) => {
      if (err) {
        return res.serverError(err);
      }
      const file = filesUploaded[0];
      contact.image = file ? file.extra.Location : null;
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
