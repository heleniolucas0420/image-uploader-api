const fs = require('fs');

getUploadedImages = () => {
  const files = fs.readdirSync('uploads');
  return files;
}

getImageReference = image_name => {
  const files = getUploadedImages();
  const image = files.find(file_name => file_name === image_name);
  const image_reference = image.split('-')[1].split('.')[0];

  return image_reference;
}

getImageExtension = image_name => {
  const files = getUploadedImages();
  const image = files.find(file_name => file_name === image_name);
  const image_extension = image.split('-')[1].split('.')[1];

  return image_extension;
}

module.exports = {
  getUploadedImages: getUploadedImages,
  getImageReference: getImageReference,
  getImageExtension: getImageExtension
}