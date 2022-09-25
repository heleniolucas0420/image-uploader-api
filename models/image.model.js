const fs = require('fs');
const path = require('path');

const { getUploadedImages } = require('../utils/image.utils');

const root_dir = path.dirname(require.main.filename);
const file_path = path.join(root_dir, 'data', 'image.data.json');
const image_path = path.join(root_dir, 'uploads');

class Image {
  constructor(id, name, image_url) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
  }

  save() {
    fs.readFile(file_path, (error, file_content) => {
      let images;

      if (error) {
        images = [];
        images.push(this);
        fs.writeFileSync(file_path, JSON.stringify(images));
      } else {
        images = JSON.parse(file_content);
        images.push(this);
        fs.writeFileSync(file_path, JSON.stringify(images));
      }
    });
  }

  static findById(image_name, callBack) {
    fs.readFile(file_path, (error, file_content) => {
      if (error) return [];

      const images = JSON.parse(file_content);
      const image = images.find(image => image.name === image_name);
      
      fs.readFile(`${path.join(image_path, image_name)}`, (error, file_content) => {
        if (error) return callBack(null);
        
        callBack({ image_data: image, image: file_content });
      })

    });
  }
}

module.exports = Image;