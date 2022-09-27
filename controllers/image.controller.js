const Image = require('../models/image.model');
const { getImageReference, getImageExtension } = require('../utils/image.utils');


exports.postImageUpload = (req, res, next) => {
  if (!req.file) res.status(400).json({ 
    success: false, 
    message: 'You fucked up. Send a valid file Format!' 
  });

  const { filename } = req.file;
  const image_reference = getImageReference(filename);
  
  const image = new Image(image_reference, filename, `http://localhost:4000/images/${filename}`);
  image.save();

  res.status(200).json({ 
    success: true, 
    message: 'Image uploaded succesfully!',
    response_data: image
  });
};

exports.getImage = (req, res, next) => {
  const { image_name } = req.params;
  Image.findById(image_name, (data) => {
    if (!data) {
      res.status(404).redirect('/image-not-found');
    } else {
      const { image_data, image } = data;
      const image_extension = getImageExtension(image_data.name);
      res.setHeader('Content-Type', `image/${image_extension}`);
      res.send(image);
    }
  });

}