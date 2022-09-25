const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    if (file.mimetype === 'image/svg+xml') {
      const sufifix = file.mimetype.split('/')[1].split('+')[0];
      cb(null, file.fieldname + '-' + Date.now() +  '.' + sufifix);
    } else {
      const sufifix = file.mimetype.split('/')[1];
      cb(null, file.fieldname + '-' + Date.now() +  '.' + sufifix);
    }
  }
});

const upload = multer({ storage: storage })

const image_controller = require('../controllers/image.controller');


// /images/upload-image/ => POST
router.post('/upload-image', upload.single('image'), image_controller.postImageUpload);

// images/:image_id => GET
router.get('/:image_name', image_controller.getImage);


module.exports = router;