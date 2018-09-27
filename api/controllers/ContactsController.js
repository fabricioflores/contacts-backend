

module.exports = {
  // @function create
  // Overrides the default create function, in order to store 
  // an image (if any) in s3.
  // @param req: request 
  // @param res: response
  // @return status 201 with the created contact
  // @return status 422 with an error 
  'create': (req, res) => {
    let contact = req.body;
    // updload to s3 with skipper-s3 if there is a file
    // istead of hardcoding sensitive information, usign env vars.
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
          // return 422 Unprocessable entity with the message error
          res.status(422);
          res.send(error);
        }else{
          // return 201 created with the contact
          res.status(201);
          res.send(contact);
        }
      });
    });
  }
};
